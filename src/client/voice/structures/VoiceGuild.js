"use strict";
const dgram = require("dgram");
const prism = require("prism-media");
const libsodium = require("libsodium-wrappers");
const gateway_data = require("../../../consts/gateway_data.json");
const { EventEmitter } = require("stream");
const WebsocketClient = require("websocket").client;
const FRAME_LENGTH = 20;
const CHANNELS = 2;
const Bt = 48000;
const TIMESTAMP_INC = (Bt / 100) * CHANNELS;

class VoiceGuild extends EventEmitter {
	constructor(voice_data, client) {
		super();
		this.d = voice_data;
		this.client = client;
		this.GatewayVoice = new WebsocketClient();
		this.socket = dgram.createSocket("udp4");
		this.nonce = Buffer.alloc(24);
		this.GatewayConnection = null;
		this.mode = "xsalsa20_poly1305";
		this.ssrc = null;
		this.port = null;
		this.ip = null;
		this.heartbeat_interval = null;
		this.secret_key = null;
		this.media_session_id = null;
		this.sequence = 0;
		this.time = 0;
		this.rtps = null;
		this.interval = null;
		this.count = 0;
		this.startPlay = 0;
		this.loading_track = 0;
		this.intervals = [];
		this.closed = 0;
		this.encoder = new prism.opus.Encoder({ "rate": Bt, "channels": CHANNELS, "frameSize": TIMESTAMP_INC });
		this.decoder = new prism.FFmpeg({
			"args": [
				"-analyzeduration", "0",
				"-loglevel", "0",
				"-f", "s16le",
				"-ar", "48000",
				"-ac", "2"
			]
		});
		this.stream = null;
	}
	play(stream) {
		if (this.loading_track == 0) {
			if (this.closed == 0) {
				this.stream = stream;
				this.startTime = Date.now();
				this.encoder.addListener("data", (chunk) => this.analys_pcak(chunk));
				this.encoder.addListener("end", (s) => this.cal_back_end(s));
				this.stream.pipe(this.decoder).pipe(this.encoder);
			}
		}
		this.loading_track = 1;
	}
	analys_pcak(chunk) {
		if (this.closed == 0) {
			if (chunk.length > 0) {
				this.startPlay = 1;
				this.time += TIMESTAMP_INC ;
				if (this.time >= 2 ** 32) this.time = 0;
				this.sequence++;
				if (this.sequence >= 2 ** 16) this.sequence = 0;
				const packetBuffer = Buffer.alloc(12);
				packetBuffer[0] = 0x80;
				packetBuffer[1] = 0x78;
				packetBuffer.writeUIntBE(this.sequence, 2, 2);
				packetBuffer.writeUIntBE(this.time, 4, 4);
				packetBuffer.writeUIntBE(this.ssrc, 8, 4);
				packetBuffer.copy(this.nonce, 0, 0, 12);
				const encrypto_data = libsodium.crypto_secretbox_easy(chunk, this.nonce, this.secret_key);
				const FULL_PACKAGE = Buffer.concat([packetBuffer, encrypto_data]);
				const next = FRAME_LENGTH + this.count * FRAME_LENGTH - (Date.now() - this.startTime);
				this.intervals.push(setTimeout((p) => this.sendp(p), next, FULL_PACKAGE));
				this.count++;
			}
		}
	}
	cal_back_end(s) {
		if (this.startPlay == 1) {
			const next = FRAME_LENGTH + this.count * FRAME_LENGTH - (Date.now() - this.startTime);
			this.startPlay = 0;
			this.sequence = 0;
			this.time = 0;
			this.count = 0;
			this.loading_track = 0;
			this.intervals = [];
			setTimeout(() => this.emit("end"), next);
		}
	}
	sendp(_package) {
		const package1 = _package;

		if (package1) {

			this.socket.send(package1, 0, package1.length, err => {
				if (err) {
					console.log(err);
				}

			});
		}

	}
	speaking() {
		const data = {
			"op": 5,
			"d": {
				"speaking": 5,
				"delay": 0,
				"ssrc": this.ssrc
			}
		};
		this.GatewayConnection.sendUTF(JSON.stringify(data));
	}
	get session_id() {
		return this.client.guilds.resolve(this.d.guild_id).voice_states.resolve(this.client.user.id).d.session_id;
	}
	start_tracking() {
		const d = this;
		this.GatewayVoice.on("connect", async connection => {
			this.GatewayConnection = connection;
			this.GatewayConnection.on("close", function() {
				// console.log("Connection lost");
			});
			this.GatewayConnection.on("message", async message => {
				if (message.type === "utf8") {
					const msg_action = await JSON.parse(message.utf8Data);
					d.analys_actions(msg_action, connection);
				}
			});
			this.auth();
		});
	}
	auth() {
		const JSON_AUTH = {
			"op": gateway_data.Opcodes_Voice.Identify,
			"d": {
				"server_id": this.d.guild_id,
				"user_id": this.client.user.id,
				"session_id": this.session_id,
				"token": this.d.token
			}
		};
		this.GatewayConnection.send(JSON.stringify(JSON_AUTH), err => {
			if (err) {
				console.log(err);
			}
		});
	}
	analys_actions(action, connection) {
		if (action.op == gateway_data.Opcodes_Voice.Hello) {
			this.heartbeat_interval = action.d.heartbeat_interval;
			setTimeout(() => this.heartbeat(connection), this.heartbeat_interval);
		} else if (action.op == gateway_data.Opcodes_Voice.Heartbeat_ACK) {
			setTimeout(() => this.heartbeat(connection), this.heartbeat_interval);
		} else if (action.op == gateway_data.Opcodes_Voice.Ready) {
			this.ssrc = action.d.ssrc;
			this.port = action.d.port;
			this.ip = action.d.ip;
			this.select_protocl();
			this.speaking();
			this.socket.on("message", data => {
				// console.log(data);
			});
			this.socket.connect(this.port, this.ip, err => {
				if (err) {
					console.log(err);
				}

			});
		} else if (action.op == gateway_data.Opcodes_Voice.Session_Description) {
			this.secret_key = new Uint8Array(action.d.secret_key.length);
			action.d.secret_key.forEach((el, i) => {
				this.secret_key[i] = el;
			});
			this.media_session_id = action.d.media_session_id;
			this.client.emit("CREATE_VOICE_CONNECTION", this, this.client);
		}

	}
	select_protocl() {
		const selected_protocl = {
			"op": gateway_data.Opcodes_Voice.Select_Protocol,
			"d": {
				"protocol": "udp",
				"data": {
					"address": this.ip,
					"port": this.port,
					"mode": this.mode
				}
			}
		};
		this.GatewayConnection.sendUTF(JSON.stringify(selected_protocl));
	}
	heartbeat(connection) {
		const JSON_H = {
			"op": 3,
			"d": Math.floor(Math.random() * 10e10)
		};
		connection.send(JSON.stringify(JSON_H));
	}
	login() {
		this.start_tracking();
		this.GatewayVoice.connect(`wss://${this.d.endpoint.replace(":443", "")}?v=4`);
	}
	stop() {
		this.loading_track = 0;
		this.encoder.removeAllListeners("data");
		this.encoder.removeAllListeners("end");
		this.startPlay = 0;
		this.count = 0;
		this.sequence = 0;
		this.time = 0;
		this.intervals.forEach(interv => {
			clearTimeout(interv);
		});
		this.intervals = [];
		this.encoder.destroy();
		this.decoder.destroy();
		this.stream.destroy();
		this.encoder = new prism.opus.Encoder({ "rate": Bt, "channels": CHANNELS, "frameSize": TIMESTAMP_INC });
		this.decoder = new prism.FFmpeg({
			"args": [
				"-analyzeduration", "0",
				"-loglevel", "0",
				"-f", "s16le",
				"-ar", "48000",
				"-ac", "2"
			]
		});
	}
	leave() {
		this.closed = 1;
		this.GatewayConnection.close();
		this.encoder.removeAllListeners("data");
		this.encoder.removeAllListeners("end");
		this.intervals.forEach(interv => {
			clearTimeout(interv);
		});
		this.intervals = [];
		this.client.rest.rest_channel.join({ "guild_id": this.d.guild_id, "channel_id": null });
	}
}
module.exports = VoiceGuild;
