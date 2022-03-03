const { Client } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", msg => {
	if (msg.d.author.id != bot.user.id) {
		const args = msg.d.content.split(" ");
		if (args[0] == "!reg") {
			const command = {
				"name": "ping",
				"type": 1,
				"description": "Ping bot"
			};
			msg.guild.create_slash(command).catch(err => console.log(err));
		}
	}

});
bot.on("INTERACTION_CREATE", i => {
	if (i.type == "SLASH" && i.d.data.name == "ping") {
		i.reply({ "content": "Pong", "ephemeral": true });
	}
});

bot.login(cfg.token);