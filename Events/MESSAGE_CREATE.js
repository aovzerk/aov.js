const { send_data } = require("../utils/utils");
const consts = require("../consts.json");
const d_message = require("../Objects/message");
const Guild = require("../Objects/guild");

module.exports = async (client, action) => {
	const data_guild = await send_data({ "method": "GET", "body": null, "url": `${consts.base_url}/guilds/${action.d.guild_id}`, "token": client.token });
	const guild = new Guild({ "id": action.d.guild_id, "token": client.token, "data": data_guild });
	const member = await guild.get_member(action.d.author.id);
	const new_message = new d_message(action, client.token, guild, member, client);
	client.emit(consts.Gateway_Events.MESSAGE_CREATE, new_message);
};
