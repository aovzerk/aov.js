"use strict";
const Interaction = require("../../structures/Interaction");
module.exports = async (client, action) => {

	const new_interaction = new Interaction(client, action);

	client.emit(action.t, new_interaction);

};