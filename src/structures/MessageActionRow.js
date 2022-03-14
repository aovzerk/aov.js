"use strict";

const comp_type = require("../consts/components_type.json");
class MessageActionRow {
	constructor() {
		this.components = [];
	}
	addComponent(...components) {
		if (this.components.length == 5) {
			throw Error("ActionRow max length: 5");
		}
		this.components.push(...components);
		return this;
	}
	toJSON() {
		return {
			"components": this.components.map(c => c.toJSON()),
			"type": comp_type.ACTION_ROW
		};
	}
}
module.exports = MessageActionRow;