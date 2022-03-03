"use strict";
const Channel = require("../../structures/Channel");
module.exports = (client, action) => {
	const old_channel = client.channels.resolve(action.d.id);
	const update_channel = new Channel(action.d, client);
	client.channels.add(update_channel);
	client.emit(action.t, old_channel, update_channel);
};