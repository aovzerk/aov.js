const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		msg.channel.send({ "content": "Hello" }).then(new_msg => {
			console.log(new_msg.channel.d);
		});
	}
});
bot.login(cfg.token);