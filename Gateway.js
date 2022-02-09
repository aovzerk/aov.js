const WebSocketClient = require("websocket").client;
const consts = require("./consts.json");
const Emitter = require("events");
const event = new Emitter();


class Gateway extends WebSocketClient {
	constructor(options) {
		super();
		const { token, intents } = options;
		this.token = token;
		this.intents_int = 0;
		this.intents_map = new Map(Object.keys(consts.intents).map(x => [x, consts.intents[x]])); // ковертируем intents(JSON) в Map
		this.calc_intents(intents); // Суммируем разрешения бота, указанные в конструкторе
	}

	calc_intents(intents) {
		intents.forEach(intent => {
			const num_intent = this.intents_map.get(intent);
			if (num_intent === undefined) throw new Error(`INVALID_INTENT: ${intent}`);
			this.intents_int += num_intent;
		});
	}

	async start_c() {
		const client = this;
		this.on("connect", async (connection) => {

			connection.on("message", async (message) => {

				if (message.type === "utf8") {

					const msg_action = await JSON.parse(message.utf8Data);
					client.analys_action(msg_action.t, msg_action, connection);

				}

			});

			this.Auth(connection);
		});
	}
	async analys_action(t, action, connection) {

		if (t == null && action.op == consts.opcodes_gateway.Hello) {
			this.interval = action.d.heartbeat_interval;
			setTimeout(this.heartbeat, this.interval, connection);
		} else if (t == null && action.op == consts.opcodes_gateway.Heartbeat_ACK) {
			setTimeout(this.heartbeat, this.interval, connection);
		} else {
			event.emit(consts.GLOBAL_EVENT, t, action);
		}


	}
	Auth(connection) {// авторизация нашего робота
		this.conn = connection;
		if (connection.connected) {
			const JSON_AUTH = {
				"op": consts.opcodes_gateway.Identify,
				"d": {
					"token": this.token,
					"intents": this.intents_int,
					"properties": {
						"$os": "windows",
						"$browser": "AOV.JS",
						"$device": "AOV.JS"
					}
				}
			};
			connection.sendUTF(JSON.stringify(JSON_AUTH));
		}
	}
	presence_update(options) {
		const { data, type } = options;
		if (this.conn.connected) {
			const JSON_PRESENCE = {
				"op": consts.opcodes_gateway.Presence_Update,
				"d": {
					"since": null,
					"activities": [{
						"name": data,
						"type": type
					}],
					"status": "online",
					"afk": false
				}
			};
			this.conn.sendUTF(JSON.stringify(JSON_PRESENCE));
		}
	}
	heartbeat(connection) { // отправка heartbeat для индентификации того что мы живы
		if (connection.connected) {
			connection.sendUTF(JSON.stringify({
				"op": consts.opcodes_gateway.Heartbeat,
				"d": null }));
		}
	}
	login() {
		this.start_c();
		this.connect(consts.base_gateway_url);
	}
}
module.exports.login = (options) => new Gateway(options);
module.exports.event = event;