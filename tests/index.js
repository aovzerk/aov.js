const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		console.log(msg.guild.members.get("283258851933814784"));
	}

});

bot.on("INTERACTION_CREATE", async i => {
	await i.deferReply();
	i.reply({ "content": "Hello" });
});
bot.login(cfg.token);