"use strict";

class VoiceGuildChacheManager {
	constructor() {
		this.cache = new Map();
	}
	resolve(id) {
		const gets_Obj = this.cache.get(id);
		if (gets_Obj) return gets_Obj;
		return null;
	}
	add(Obj) {
		this.cache.set(Obj.d.guild_id, Obj);
	}
	delete(Obj) {
		this.cache.delete(Obj.d.guild_id);
	}
}
module.exports = VoiceGuildChacheManager;