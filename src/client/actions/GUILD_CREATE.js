"use strict";
const Guild = require("../../structures/Guild");
const Channel = require("../../structures/Channel");
module.exports = async (client, action) => {

	const new_guild = new Guild(client, action);
	client.guilds.add(new_guild);
	action.d.channels.forEach(chn_data => {
		const new_chn_data = chn_data;
		new_chn_data.guild_id = new_guild.d.id;
		client.channels.add(new Channel(new_chn_data, client));
	});
	client.emit(action.t, new_guild);

};