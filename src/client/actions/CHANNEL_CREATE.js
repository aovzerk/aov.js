"use strict";
const Channel = require("../../structures/Channel");
module.exports = (client, action) => {
	const new_channel = new Channel(action.d, client);
	client.channels.add(new_channel);
	client.emit(action.t, new_channel);
};