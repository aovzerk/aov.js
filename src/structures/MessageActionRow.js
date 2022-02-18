"use strict";

const comp_type = require("../consts/components_type.json");
class MessageActionRow {
	constructor() {
		this.components = [];
	}
	addComponent(...components) {
		this.components.push(...components);
	}
	toJSON() {
		return {
			"components": this.components.map(c => c.toJSON()),
			"type": comp_type.ACTION_ROW
		};
	}
}
module.exports = MessageActionRow;