"use strict";
const Channel = require("../../structures/Channel");
module.exports = async (client, action) => {
	const deleted_channel = new Channel(action.d, client);
	client.channels.delete(deleted_channel);
	client.emit(action.t, deleted_channel);
};