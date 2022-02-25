"use strict";

const EventEmitter = require("events");

class TrackMessageComponent extends EventEmitter {
	constructor(message, filter, time) {
		super();
		this.filter = filter;
		this.time = time;
		this.message = message;
		this.init();
	}
	init() {
		this.addListener("end", () => this.callback_end());
		this.message.client.addListener("INTERACTION_CREATE", (i) => this.generate_callback_action(i));
		setTimeout(() => this.emit("end"), this.time);
	}
	callback_end() {
		this.removeAllListeners("action");
		this.message.client.removeListener("INTERACTION_CREATE", this.generate_callback_action);
	}
	generate_callback_action(i) {
		if (this.filter(i) && i.d.message.id == this.message.d.id) {
			this.emit("action", i);
		}

	}
}
module.exports = TrackMessageComponent;