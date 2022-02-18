const { Client, MessageActionRow, MessageButton } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("MESSAGE_CREATE", async msg => {
	/* const slash = {
		"name": "profile",
		"description": "Посмотреть профиль пользователя",
		"options": [
			{
				"type": 6,
				"name": "user",
				"description": "Пользователь дискорд",
				"required": false
			}
		]
	};
	await msg.guild.create_slash(slash);*/
	console.log(msg.member);
});
bot.on("INTERACTION_CREATE", async i => {
	// await i.deferReply();
	if (i.type == "SLASH") {
		const user = i.option("user");
		let member = null;
		if (user != null) {
			member = i.guild.member(user);
		} else {
			member = i.member;
		}

		i.reply({ "content": `${member.d.user.username}#${member.d.user.discriminator} создал аккаунт <t:${Math.round(member.d.user.create_at / 1000)}:R>\nЗашел на сервер <t:${Math.round(member.d.joined_at / 1000)}:R>` });
	}

});
bot.login(cfg.token);