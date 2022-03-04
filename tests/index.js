const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents, "prefix": "!" });

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.add_command(say);

function say(msg, text) {
	msg.reply({ "content": `${text}` });
}
bot.login(cfg.token);