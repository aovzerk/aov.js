"use strict";

const comp_type = require("../consts/components_type.json");
class MessageButton {
	constructor() {
		this.label = null;
		this.style = null;
		this.custom_id = null;
	}
	setCustomId(customId) {
		this.custom_id = customId;
		return this;
	}
	setStyle(style) {
		this.style = comp_type.STYLES[style];
		return this;
	}
	setLabel(label) {
		this.label = label;
		return this;
	}
	toJSON() {
		return {
			"type": comp_type.BUTTON,
			"style": this.style,
			"label": this.label,
			"custom_id": this.custom_id
		};
	}
}
module.exports = MessageButton;