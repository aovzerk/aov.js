# Добро пожаловать на страницу aov.js!

Это библиотека развивается в качестве изучения языка js и его особенностей, а также работы wss, http requests. Возможно эта библиотека чем-то вас заинтересует =)

[Документация](https://github.com/aovzerk/aov.js/tree/main/doc)

# Установка
Требуется Node.js 16.9.0 или новее.
```
npm install aov.js
```
# Код для создания эхо-бота на слеш командах для Discord

```js
const { Client } =  require("aov.js");
const  cfg  =  require("./cfg.json");
const  bot  =  new  Client({ "intents":  cfg.intents });

bot.on("READY", user  => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});

bot.on("MESSAGE_CREATE", msg  => {
	if (msg.d.author.id  !=  bot.user.id) {
		const  args  =  msg.d.content.split(" ");
		if (args[0] ==  "!reg") {
			const  command  = {
				"name":  "ping",
				"type":  1,
				"description":  "Ping bot"
			};
			msg.guild.create_slash(command).catch(err  =>  console.log(err));
		}
	}
});

bot.on("INTERACTION_CREATE", i  => {
	if (i.type  ==  "SLASH"  &&  i.d.data.name  ==  "ping") {
		i.reply({ "content":  "Pong", "ephemeral":  true });
	}
});

bot.login(cfg.token);
```
