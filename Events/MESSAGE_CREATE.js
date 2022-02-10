const { send_data } = require("../utils/utils");
const consts = require("../consts.json");
const d_message = require("../Objects/message");
const Guild = require("../Objects/guild");

module.exports = async (client, action) => {
	if (action.d.webhook_id && action.d.interaction) {
		client.cache_webhook_interaction.set(action.d.interaction.id, { "webhook_id": action.d.webhook_id, "message_id": action.d.id, "application_id": action.d.application_id });
	} else {
		const data_guild = await send_data({ "method": "GET", "body": null, "url": `${consts.base_url}/guilds/${action.d.guild_id}`, "token": client.token });
		const guild = new Guild({ "id": action.d.guild_id, "token": client.token, "data": data_guild, "client": client });
		const member = await guild.get_member(action.d.author.id);
		const new_message = new d_message(action, client.token, guild, member, client);
		client.emit(consts.Gateway_Events.MESSAGE_CREATE, new_message);
	}

};
