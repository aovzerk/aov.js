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
class Client extends EventEmitter {
	constructor(options) {
		super();
		this.user = null;
		this.token = null;
		this.connection = null;
		this.intents = null;
		this.Gateway = new Gateway();
		this.actions = actions;
		this.intents_map = new Map(Object.keys(c_intents).map(x => [x, c_intents[x]])); // ковертируем intents(JSON) в Map
		this.calc_intents(options.intents); // Суммируем разрешения бота, указанные в конструкторе
		this.start_gateway_connection();
		this.channels = new ChannelCacheManager(this);
		this.guild = new GuildCacheManager(this);
		this.messages = new MessageCacheManager(this);
		this.webhooks_interation = new InteractionWebhookCacheManager(this);
	}

	async analys_action(t, action, connection) {

		if (t == null && action.op == gateway_data.Opcodes.Hello) {

			this.Gateway.interval = action.d.heartbeat_interval;
			setTimeout(() => this.Gateway.heartbeat(connection), this.Gateway.interval);
		} else if (t == null && action.op == gateway_data.Opcodes.Heartbeat_ACK) {
			setTimeout(() => this.Gateway.heartbeat(connection), this.Gateway.interval);
		} else if (this.actions[t]) {
			this.actions[t](this, action);
		}


	}
	start_gateway_connection() {
		this.Gateway.on("connect", async connection => {
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
		intents.forEach(intent => {
			const num_intent = this.intents_map.get(intent);
			if (num_intent === undefined) throw new Error(`INVALID_INTENT: ${intent}`);
			this.intents_int += num_intent;
		});
	}
	login(token) {
		this.token = token;
		// this.analys_gateway_op();
		this.Gateway.login();
	}
}
module.exports = Client;