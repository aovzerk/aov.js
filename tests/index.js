const { Client, Embed } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("MESSAGE_CREATE", async msg => {
	if (msg.member.d.user.id != bot.user.id) {
		const embed = new Embed();
		embed.setDescription("Hello")
			.setAuthor({ "name": `Запросил ${msg.member.d.user.username}` });

		msg.reply({ "embeds": [embed.toJSON()] });
	}


});
bot.login(cfg.token);