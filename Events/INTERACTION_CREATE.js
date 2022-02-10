const { send_data } = require("../utils/utils");
const consts = require("../consts.json");
const Guild = require("../Objects/guild");
const Interaction = require("../Objects/interaction");
module.exports = async (client, action) => {
	const url = `${consts.base_url}/interactions/${action.d.id}/${action.d.token}/callback`;
	const full_content_new_msg = {
		"type": 5
	};
	await send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": client.token, "get_json": false }).catch(err => console.log(err));
	const data_guild = await send_data({ "method": "GET", "body": null, "url": `${consts.base_url}/guilds/${action.d.guild_id}`, "token": client.token });
	const guild = new Guild({ "id": action.d.guild_id, "token": client.token, "data": data_guild, "client": client });
	const member = await guild.get_member(action.d.member.user.id);
	const new_interaction = new Interaction(member, guild, action.d, client);
	client.emit(consts.Gateway_Events.INTERACTION_CREATE, new_interaction);
};
