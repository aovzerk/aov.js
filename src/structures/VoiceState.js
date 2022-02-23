"use strict";
class VoiceState {
	constructor(voice_data, client) {
		this.d = voice_data;
		this.client = client;
	}
}
module.exports = VoiceState;