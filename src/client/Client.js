"use strict";

const EventEmitter = require("events");
const Gateway = require("./Gateway");
const c_intents = require("../consts/intents.json");
const gateway_data = require("../consts/gateway_data.json");
const actions = require("./actions");
const ChannelCacheManager = require("./managers/ChannelCacheManager");
const GuildCacheManager = require("./managers/GuildCacheManager");
const MessageCacheManager = require("./managers/MessageCacheManager");
const InteractionWebhookCacheManager = require("./managers/InteractionWebhookCacheManager");
const ComponentsWebhookCacheManager = require("./managers/ComponentsWebhookCacheManager");
const RestManager = require("./managers/RestManager");
const ClientVoiceManager = require("./voice/ClientVoice");

class Client extends EventEmitter {
	constructor(options) {
		super();
		this.user = null;
		this.token = null;
		this.connection = null;
		this.intents = null;
		this.Gateway = new Gateway();
		this.actions = actions;
		this.calc_intents(options.intents); // Суммируем разрешения бота, указанные в конструкторе
		this.start_gateway_connection();
		this.channels = new ChannelCacheManager(this);
		this.guilds = new GuildCacheManager(this);
		this.messages = new MessageCacheManager(this);
		this.webhooks_interaсtion = new InteractionWebhookCacheManager(this);
		this.webhooks_components = new ComponentsWebhookCacheManager(this);
		this.rest = new RestManager(this);
		this.voices = new ClientVoiceManager(this);

	}

	async analys_action(t, action, connection) {
		if (t == null && action.op == gateway_data.Opcodes.Hello) {
			this.Gateway.interval = action.d.heartbeat_interval;
			setTimeout((_connection) => this.Gateway.heartbeat(_connection), this.Gateway.interval, connection);
		} else if (t == null && action.op == gateway_data.Opcodes.Heartbeat_ACK) {
			setTimeout((_connection) => this.Gateway.heartbeat(_connection), this.Gateway.interval, connection);
		} else if (this.actions[t]) {
			this.actions[t](this, action);
		}


	}
	start_gateway_connection() {
		this.Gateway.on("connect", async connection => {
			this.voices.tracking_data(connection);
			connection.on("message", async message => {
				if (message.type === "utf8") {
					const msg_action = await JSON.parse(message.utf8Data);
					this.analys_action(msg_action.t, msg_action, connection);
				}
			});
			connection.on("close", function() {
				throw Error("Connection lost");
			});
			this.Gateway.Auth(connection, this.token, this.intents);
		});
	}
	calc_intents(intents) {
		const intents_map = new Map(Object.keys(c_intents).map(x => [x, c_intents[x]])); // ковертируем intents(JSON) в Map
		intents.forEach(intent => {
			const num_intent = intents_map.get(intent);
			if (num_intent === undefined) throw new Error(`INVALID_INTENT: ${intent}`);
			this.intents += num_intent;
		});
	}
	login(token) {
		this.token = token;
		// this.analys_gateway_op();
		this.Gateway.login();
	}
}
module.exports = Client;