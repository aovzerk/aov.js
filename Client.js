const Emitter = require("events");
const { send_data } = require("./utils/utils");
const consts = require("./consts.json");
const d_message = require("./Objects/message");
const Gateway = require("./Gateway");
const event_Gateway = require("./Gateway").event;
const Guild = require("./Objects/guild");
class Client extends Emitter {
	constructor(options) {
		super();
		const { token, intents } = options;
		this.tracing_event_on_gateway();
		this.token = token;
		this.intents = intents;
		this.user = null;
		this.commands = new Map();
	}
	async tracing_event_on_gateway() {
		event_Gateway.on(consts.Gateway_Events.READY, async action => {
			this.guilds = action.d.guilds;
			this.user = action.d.user;
			this.emit(consts.Gateway_Events.READY, this.user);
		});
		event_Gateway.on(consts.Gateway_Events.MESSAGE_CREATE, async action => {
			const data_guild = await send_data({ "method": "GET", "body": null, "url": `${consts.base_url}/guilds/${action.d.guild_id}`, "token": this.token });
			const guild = new Guild({ "id": action.d.guild_id, "token": this.token, "data": data_guild });
			const member = await guild.get_member(action.d.author.id);
			const new_message = new d_message(action, this.token, guild, member, this);
			this.emit(consts.Gateway_Events.MESSAGE_CREATE, new_message);
		});
	}
	async set_activity(options) {
		this.Gateway.presence_update(options);
	}
	login() {
		this.Gateway = Gateway.login({ "token": this.token, "intents": this.intents });
		this.Gateway.login();
	}

}
module.exports = Client;


