"use strict";
const Interaction = require("./Interaction");
class SelectMenuInteraction extends Interaction {
	constructor(client, action) {
		super(client, action);
		this.type = "SELECT_MENU";
	}
}
module.exports = SelectMenuInteraction;