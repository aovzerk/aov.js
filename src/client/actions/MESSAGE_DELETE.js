"use strict";
const Message = require("../../structures/Message");

module.exports = async (client, action) => {

	const deleted_msg = new Message(client, action);
	client.messages.delete(deleted_msg);
	client.emit(action.t, deleted_msg);

};