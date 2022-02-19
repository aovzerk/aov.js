const { Client, Embed } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("INTERACTION_CREATE", i => {
	if (i.type == "SLASH") {
		const embed = new Embed();
		embed.setDescription("Hello")
			.setAuthor({ "name": `Запросил ${i.member.d.user.username}` });

		i.reply({ "embeds": [embed.toJSON()], "ephemeral": false });
	}
});
bot.on("MESSAGE_CREATE", async msg => {
	if (msg.member.d.user.id != bot.user.id) {
		const embed = new Embed();
		embed.setDescription("Hello")
			.setAuthor({ "name": `Запросил ${msg.member.d.user.username}` });

		msg.reply({ "embeds": [embed.toJSON()], "ephemeral": true });
	}


});
bot.login(cfg.token);