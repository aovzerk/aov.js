"use strict";
const Message = require("../../structures/Message");

module.exports = (client, action) => {
	if (action.d.interaction && action.d.webhook_id) {
		client.webhooks_interaсtion.add(action);
	} else if (action.d.message_reference && action.d.webhook_id) {
		client.webhooks_components.add(action);
	} else {
		const new_msg = new Message(client, action);
		client.messages.add(new_msg);
		client.emit(action.t, new_msg);
		client.commands.forEach(command => {
			command.run(new_msg);
		});
	}


};