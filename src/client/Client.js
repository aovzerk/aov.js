"use strict";

const EventEmitter = require("events");
// const Gateway = require("./Gateway");
const c_intents = require("../consts/intents.json");
const actions = require("./actions");
const ChannelCacheManager = require("./managers/ChannelCacheManager");
const GuildCacheManager = require("./managers/GuildCacheManager");
const MessageCacheManager = require("./managers/MessageCacheManager");
const InteractionWebhookCacheManager = require("./managers/InteractionWebhookCacheManager");
const ComponentsWebhookCacheManager = require("./managers/ComponentsWebhookCacheManager");
const RestManager = require("./managers/RestManager");
const ClientVoiceManager = require("./voice/ClientVoice");
const Command = require("../structures/Command");
const GatewayManager = require("./managers/GatewayManager");
class Client extends EventEmitter {
	constructor(options) {
		super();
		this.setMaxListeners(0);
		this.user = null;
		this.intents = null;
		this.actions = actions;
		this.calc_intents(options.intents); // Суммируем разрешения бота, указанные в конструкторе
		this.channels = new ChannelCacheManager(this);
		this.guilds = new GuildCacheManager(this);
		this.messages = new MessageCacheManager(this);
		this.webhooks_interaсtion = new InteractionWebhookCacheManager(this);
		this.webhooks_components = new ComponentsWebhookCacheManager(this);
		this.rest = new RestManager(this);
		this.voices = new ClientVoiceManager(this);
		this.GatewayManager = new GatewayManager();
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
	analys_action(t, action) {
		if (t == "GUILD_CREATE", this.actions[t]) {
			this.actions[t](this, action);
		} else if (this.actions[t] && this.parsing_guilds == null) {
			this.actions[t](this, action);
		}


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
	track_create_connection() {
		this.GatewayManager.on("created", () => {
			this.track_gateway_data();
			this.GatewayManager.Auth(this.token, this.intents);
		});
	}
	track_gateway_data() {
		this.GatewayManager.connection.on("message", action_data => {
			if (action_data.type === "utf8") {
				const json_action = JSON.parse(action_data.utf8Data);
				this.analys_action(json_action.t, json_action);
			}
		});
	}
	login(token) {
		this._token = () => token;
		this.track_create_connection();
		this.GatewayManager.create_connection();
	}
}
module.exports = Client;