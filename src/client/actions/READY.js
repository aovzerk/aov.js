"use strict";

module.exports = async (client, action) => {
	client.user = action.d.user;
	client.emit(action.t, client.user);
};