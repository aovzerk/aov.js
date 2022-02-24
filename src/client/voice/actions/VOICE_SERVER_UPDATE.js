"use strict";
const VoiceGuild = require("../structures/VoiceGuild");
module.exports = async (VoiceManager, action, client) => {
	const v_guild = new VoiceGuild(action.d, client);
	v_guild.login();
	VoiceManager.voices.add(v_guild);
};