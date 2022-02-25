"use strict";

const GuildMember = require("../../structures/GuildMember");
module.exports = async (client, action) => {

	const guild = client.guilds.resolve(action.d.guild_id);
	if (guild != null) {
		const new_member = new GuildMember(action.d, client);
		const old_member = guild.members.resolve(new_member.d.user.id);
		guild.members.add(new_member);
		client.guilds.add(guild);
		client.emit(action.t, old_member, new_member);
	}


};