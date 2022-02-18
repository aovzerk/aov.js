const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		msg.guild.channels.get("941618046936707162").send({ "content": "Hello" });
	}

});

bot.on("INTERACTION_CREATE", async i => {
	await i.deferReply();
	i.reply({ "content": "Hello" });
});
bot.login(cfg.token);