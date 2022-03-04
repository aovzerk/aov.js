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
const Command = require("../structures/Command");
class Client extends EventEmitter {
	constructor(options) {
		super();
		this.setMaxListeners(0);
		this.user = null;
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
		this.parsing_guilds = setTimeout(() => this.disable_parsing_guilds(), 10000);
		this.commands = [];
		this.guilds_prefix = new Map();
		this.prefix = options.prefix;
	}
	set_prefix(id, prefix) {
		this.guilds_prefix.set(id, prefix);
	}
	add_command(func, options) {
		this.commands.push(new Command(func, options));
	}
	disable_parsing_guilds() {
		clearTimeout(this.parsing_guilds);
		this.parsing_guilds = null;

	}
	analys_action(t, action, connection) {
		if (t == null && action.op == gateway_data.Opcodes.Hello) {
			this.Gateway.interval = action.d.heartbeat_interval;
			setTimeout((_connection) => this.Gateway.heartbeat(_connection), this.Gateway.interval, connection);
		} else if (t == null && action.op == gateway_data.Opcodes.Heartbeat_ACK) {
			setTimeout((_connection) => this.Gateway.heartbeat(_connection), this.Gateway.interval, connection);
		} else if (t == "GUILD_CREATE", this.actions[t]) {
			this.actions[t](this, action);
		} else if (this.actions[t] && this.parsing_guilds == null) {
			this.actions[t](this, action);
		}


	}
	start_gateway_connection() {
		this.Gateway.on("connect", connection => {
			this.voices.tracking_data(connection);
			connection.on("message", message => {
				if (message.type === "utf8") {
					const msg_action = JSON.parse(message.utf8Data);
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
	get token() {
		return this._token();
	}
	login(token) {
		this._token = () => token;

		this.Gateway.login();
	}
}
module.exports = Client;