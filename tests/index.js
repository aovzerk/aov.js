const { Client, MessageActionRow, MessageButton } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		const row = new MessageActionRow();
		const button = new MessageButton();
		button.setCustomId("id_1");
		button.setStyle("DANGER");
		button.setLabel("Hello");
		row.addComponent(
			button
		);
		msg.channel.send({ "content": "Hello", "components": [row.toJSON()] });
	}

});

bot.on("INTERACTION_CREATE", async i => {
	// await i.deferReply();
	if (i.type == "BUTTON") {
		i.reply({ "content": "Hello" });
	} else if (i.type == "SLASH") {
		await i.deferReply();
		const row = new MessageActionRow();
		const button = new MessageButton();
		button.setCustomId("id_1");
		button.setStyle("DANGER");
		button.setLabel("Hello");
		row.addComponent(
			button
		);
		i.reply({ "content": "Hello", "components": [row.toJSON()] });
	}

});
bot.login(cfg.token);