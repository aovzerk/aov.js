"use strict";

const VoiceState = require("../../structures/VoiceState");
module.exports = async (client, action) => {
	const guild = client.guilds.resolve(action.d.guild_id);
	const new_voice_state = new VoiceState(action.d, client);
	const old_voice_state = guild.voice_states.resolve(new_voice_state.d.user_id);
	guild.voice_states.add(new_voice_state);
	client.guilds.add(guild);
	client.emit(action.t, old_voice_state, new_voice_state);

};