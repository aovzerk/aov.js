"use strict";

module.exports = (client, action) => {
	client.user = action.d.user;
	client.emit(action.t, client.user);
};