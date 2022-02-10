const handlers = {
	"READY": require("./READY"),
	"MESSAGE_CREATE": require("./MESSAGE_CREATE"),
	"INTERACTION_CREATE": require("./INTERACTION_CREATE")
};

module.exports = handlers;