"use strict";

const BaseCommand = require("./BaseCommand");

class Command extends BaseCommand {
	constructor(func, options) {
		super(func);
		if (options == undefined) this.use_default = false;
		else this.use_default = options.use_default == undefined ? false : options.use_default;

	}
	run(message) {
		if (message.d.author.id == message.client.user.id) return;
		let prefix = null;
		if (this.use_default) {
			prefix = message.client.prefix;
		} else {
			prefix = message.client.guilds_prefix.get(message.d.guild_id) != undefined ? message.client.guilds_prefix.get(message.d.guild_id) : message.client.prefix;
		}

		const args = message.d.content.split(" ").filter(entery => entery.trim() != "");
		if (!args[0].startsWith(`${prefix}${this.func.name}`) || args[0].length != (this.func.name.length + prefix.length)) return;
		args.splice(0, 1);
		this.func(message, ...args);
	}

}
module.exports = Command;