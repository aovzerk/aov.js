"use strict";
const Message = require("../../structures/Message");

module.exports = async (client, action) => {
	if (action.d.interaction && action.d.webhook_id) {
		client.webhooks_interation.add(action);
	} else {
		const new_msg = new Message(client, action);
		client.messages.add(new_msg);
		client.emit(action.t, new_msg);
	}


};