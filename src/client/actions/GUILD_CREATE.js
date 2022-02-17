"use strict";
const Guild = require("../../structures/Guild");
const Channel = require("../../structures/Channel");
module.exports = async (client, action) => {

	const new_guild = new Guild(client, action);
	client.guild.add(new_guild);
	action.d.channels.forEach(chn_data => {
		client.channels.add(new Channel(chn_data, client));
	});
	client.emit(action.t, new_guild);

};