"use strict";

const comp_type = require("../consts/components_type.json");
class Emoji {
	constructor(data) {
		const { name, id, animated } = data;
		this.name = name;
		this.id = id;
		this.animated = animated;
	}
	toJSON() {
		return {
			"id": this.id,
			"name": this.name,
			"animated": this.animated
		};
	}
}
class SelectMenuOption {
	constructor(data) {
		const { label, value, description, emoji, default_ } = data;
		this.label = label;
		this.value = value;
		this.description = description;
		this.emoji = new Emoji(emoji);
		this.default_ = default_;
	}
	toJSON() {
		return {
			"label": this.label,
			"value": this.value,
			"description": this.description,
			"emoji": this.emoji.toJSON(),
			"default": this.default_
		};
	}
}
class SelectMenu {
	constructor() {
		this.type = comp_type.SELECT_MENU;
		this.custom_id = null;
		this.placeholder = null;
		this.min_values = null;
		this.max_values = null;
		this.options = [];
	}
	setCustomId(customId) {
		this.custom_id = customId;
		return this;
	}
	setPlaceholder(placeholder) {
		this.placeholder = placeholder;
		return this;
	}
	setMinValues(num) {
		this.min_values = num;
		return this;
	}
	setMaxValues(num) {
		this.max_values = num;
		return this;
	}
	addOption(...options) {
		options.forEach(option => {
			this.options.push(new SelectMenuOption(option));
		});
		return this;
	}
	toJSON() {
		return {
			"type": this.type,
			"options": this.options.map(c => c.toJSON()),
			"custom_id": this.custom_id,
			"placeholder": this.placeholder,
			"min_values": this.min_values,
			"max_values": this.max_values
		};
	}
}

module.exports = SelectMenu;