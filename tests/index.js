const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("CHANNEL_UPDATE", async (old, newc) => {
	// console.log(old.d);
	// console.log(newc.d);
});

bot.login(cfg.token);