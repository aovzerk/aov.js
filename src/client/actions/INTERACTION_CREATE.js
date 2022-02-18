"use strict";
const gateway_data = require("../../consts/gateway_data.json");
const InteractionSlash = require("../../structures/InteractionSlash");
module.exports = async (client, action) => {
	let new_interaction = null;
	switch (action.d.type) {
		case gateway_data.Interaction_Types.APPLICATION_COMMAND:
			new_interaction = new InteractionSlash(client, action);
			break;
	}


	client.emit(action.t, new_interaction);

};