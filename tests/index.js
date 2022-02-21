const { Client, Embed, MessageActionRow, MessageButton } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("INTERACTION_CREATE", async i => {
	if (i.type == "BUTTON") {
		await i.deferReply({ "ephemeral": true });
		setTimeout(() => i.reply({ "content": "Вы нажали на кнопку", "ephemeral": true }).catch(err => console.log(err)), 5000);

	}
	if (i.type == "SLASH") {
		await i.deferReply({ "ephemeral": true });
		setTimeout(() => i.reply({ "content": "Вы нажали на кнопку", "ephemeral": true }).catch(err => console.log(err)), 5000);
	}
});
bot.on("MESSAGE_CREATE", async msg => {
	if (msg.member.d.user.id != bot.user.id) {
		const row = new MessageActionRow();
		row.addComponent(
			new MessageButton()
				.setCustomId("id1")
				.setLabel("Hello")
				.setStyle("DANGER")
		);
		msg.reply({ "content": "Hello", "components": [row] }).then(new_msg => {
			setTimeout(() => new_msg.delete().catch(err => console.log(err)), 5000);
		});
		await msg.member.roles.add("942690399774982144");
	}


});
bot.login(cfg.token);