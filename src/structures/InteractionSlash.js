"use strict";
const Interaction = require("./Interaction");
class InteractionSlash extends Interaction {
	constructor(client, action) {
		super(client, action);
		this.type = "SLASH";
	}
	option(o) {
		let data = null;
		if (this.d.data.options) {
			this.d.data.options.forEach(el => {
				if (el.name == o) {
					data = el.value;
				}
			});
		}

		return data;
	}
}
module.exports = InteractionSlash;