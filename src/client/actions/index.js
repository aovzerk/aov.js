"use strict";

const actions = {
	"READY": require("./READY"),
	"MESSAGE_CREATE": require("./MESSAGE_CREATE"),
	"GUILD_CREATE": require("./GUILD_CREATE")
};
module.exports = actions;