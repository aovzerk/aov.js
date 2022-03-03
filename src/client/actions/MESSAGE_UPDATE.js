"use strict";
const Message = require("../../structures/Message");

module.exports = (client, action) => {

	const new_msg = new Message(client, action);
	const old_msg = client.messages.resolve(action.d.id);
	client.messages.add(new_msg);
	client.emit(action.t, old_msg, new_msg);

};