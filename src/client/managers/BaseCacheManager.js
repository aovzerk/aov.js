"use strict";

class BaseManager {
	constructor(client) {
		this.client = client;
		this.cache = new Map();
	}
	resolve(id) {
		const gets_Obj = this.cache.get(id);
		if (gets_Obj) return gets_Obj;
		throw Error(`None id: ${id}`);
	}
	add(Obj) {
		this.cache.set(Obj.d.id, Obj);
	}
	delete(Obj) {
		this.cache.delete(Obj.d.id);
	}
}
module.exports = BaseManager;