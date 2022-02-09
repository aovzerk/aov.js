const consts = require("../consts.json");

module.exports = async (client, action) => {
	client.guilds = action.d.guilds;
	client.user = action.d.user;
	client.emit(consts.Gateway_Events.READY, client.user);
};