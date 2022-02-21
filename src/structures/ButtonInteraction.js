"use strict";
const Interaction = require("./Interaction");
class ButtonInteraction extends Interaction {
	constructor(client, action) {
		super(client, action);
		this.deferReply_is = 0;
		this.reply_is = 0;
		this.type = "BUTTON";
	}
}
module.exports = ButtonInteraction;