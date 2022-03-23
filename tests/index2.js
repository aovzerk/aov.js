const { Client, MessageActionRow, SelectMenu, MessageButton } = require("../");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});


bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		const args = msg.d.content.split(" ");
		if (args[0] == "!get") {
			const row = new MessageActionRow();
			const btn = new MessageButton()
				.setCustomId("btn1")
				.setLabel("Hello")
				.setStyle("PRIMARY");
			const menu = new SelectMenu();
			menu.setCustomId("menu_id1")
				.setPlaceholder("Выберети")
				.setMinValues(0)
				.setMaxValues(1)
				.addOption({
					"label": "Rogue",
					"value": "rogue",
					"description": "Sneak n stab",
					"emoji": {
						"name": "rogue",
						"id": "625891304148303894"
					}
				},
				{
					"label": "Mage",
					"value": "mage",
					"description": "Turn 'em into a sheep",
					"emoji": {
						"name": "mage",
						"id": "625891304081063986"
					}
				},
				{
					"label": "Priest",
					"value": "priest",
					"description": "You get heals when I'm done doing damage",
					"emoji": {
						"name": "priest",
						"id": "625891303795982337"
					}
				});
			row.addComponent(menu);
			const row2 = new MessageActionRow();
			row2.addComponent(btn);
			msg.channel.send({ "components": [row.toJSON(), row2.toJSON()] }).catch(err => console.log(err));
		}
	}
});
bot.on("INTERACTION_CREATE", i => {
	console.log(i.d.data.values);
	i.reply({ "content": i.d.data.values[0] });
});
bot.login(cfg.token);