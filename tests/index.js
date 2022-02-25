const { Client } = require("../");
const { MessageActionRow, MessageButton } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		const row = new MessageActionRow()
			.addComponent(
				new MessageButton()
					.setCustomId("id1")
					.setLabel("⬅️")
					.setStyle("PRIMARY"),
				new MessageButton()
					.setCustomId("id2")
					.setLabel("➡️")
					.setStyle("PRIMARY")
			);
		msg.channel.send({ "content": "hello", "components": [row] }).then(async newmsg => {
			const filter = (i) => (i.d.data.custom_id === "id1" || i.d.data.custom_id === "id2");
			const tracking = await newmsg.create_tracking_componets_action(filter, 5000);
			tracking.on("action", i => {
				console.log(i);
			});
		});
	}

});


bot.login(cfg.token);