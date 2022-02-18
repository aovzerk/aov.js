"use strict";
const Guild = require("../../structures/Guild");
const Channel = require("../../structures/Channel");
const GuildMember = require("../../structures/GuildMember");
module.exports = async (client, action) => {

	const new_guild = new Guild(client, action);

	action.d.channels.forEach(chn_data => {
		const new_chn_data = chn_data;
		new_chn_data.guild_id = new_guild.d.id;
		client.channels.add(new Channel(new_chn_data, client));
	});
	action.d.members.forEach(member_data => {
		const new_member_data = member_data;
		new_member_data.guild_id = new_guild.d.id;
		new_guild._members.add(new GuildMember(new_member_data, client));
	});
	client.guilds.add(new_guild);
	client.emit(action.t, new_guild);

};