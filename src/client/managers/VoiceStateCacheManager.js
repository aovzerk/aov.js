"use strict";

const BaseManager = require("./BaseCacheManager");

class VoiceStateCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
	resolve(id) {
		const gets_Obj = this.cache.get(id);
		if (gets_Obj) return gets_Obj;
		return null;
	}
	add(Obj) {
		this.cache.set(Obj.d.user_id, Obj);
	}
	delete(Obj) {
		this.cache.delete(Obj.d.user_id);
	}
}
module.exports = VoiceStateCacheManager;