const Emitter = require("events");
const Gateway = require("./Gateway");
const event_Gateway = require("./Gateway").event;
const Bot_events = require("./Events");
const consts = require("./consts.json");
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
		event_Gateway.on(consts.GLOBAL_EVENT, async (t, action) => {
			if (Bot_events[t]) {
				Bot_events[t](this, action);
			}
		});
	}
	async set_activity(options) {
		this.Gateway.presence_update(options);
	}
	async login() {
		this.Gateway = Gateway.login({ "token": this.token, "intents": this.intents });
		this.Gateway.login();
	}

}
module.exports = Client;


