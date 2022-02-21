const { Client, Embed, MessageActionRow, MessageButton } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": [cfg.intents] });


bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("INTERACTION_CREATE", async i => {
	if (i.type == "BUTTON") {
		await i.deferReply({ "ephemeral": true });
		i.reply({ "content": "Вы нажали на кнопку", "ephemeral": true });
	}
});
bot.on("MESSAGE_CREATE", async msg => {
	if (msg.member.d.user.id != bot.user.id) {
		msg.channel.send({ "content": "Hello" }).then(new_msg =>{
			console.log(new_msg);
		});
	}


});
bot.login(cfg.token);