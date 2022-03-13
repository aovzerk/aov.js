"use strict";
const Interaction = require("./Interaction");
class ButtonInteraction extends Interaction {
	constructor(client, action) {
		super(client, action);
		this.type = "BUTTON";
	}
}
module.exports = ButtonInteraction;