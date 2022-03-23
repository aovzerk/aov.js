"use strict";
const gateway_data = require("../../consts/gateway_data.json");
const component_types = require("../../consts/components_type.json");
const InteractionSlash = require("../../structures/InteractionSlash");
const ButtonInteraction = require("../../structures/ButtonInteraction");
const SelectMenuInteraction = require("../../structures/SelectMenuInteraction");
module.exports = (client, action) => {
	let new_interaction = null;
	if (action.d.type == gateway_data.Interaction_Types.APPLICATION_COMMAND) {
		new_interaction = new InteractionSlash(client, action);
		client.emit(action.t, new_interaction);
		return;
	} else {
		switch (action.d.data.component_type) {
			case component_types.BUTTON:
				new_interaction = new ButtonInteraction(client, action);
				break;
			case component_types.SELECT_MENU:
				new_interaction = new SelectMenuInteraction(client, action);
				break;
		}
		client.emit(action.t, new_interaction);
	}
};