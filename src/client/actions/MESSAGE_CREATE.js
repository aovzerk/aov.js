"use strict";
const Message = require("../../structures/Message");

module.exports = async (client, action) => {

	const new_msg = new Message(client, action);
	client.cache_msg.set(new_msg.d.id, new_msg);
	client.emit(action.t, new_msg);

};