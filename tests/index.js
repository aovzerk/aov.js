const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", async msg => {

});

bot.on("INTERACTION_CREATE", async i => {
	i.reply({ "content": "Hello" });
});
bot.login(cfg.token);