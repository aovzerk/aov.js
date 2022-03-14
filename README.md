# Добро пожаловать на страницу aov.js!

Это библиотека развивается в качестве изучения языка js и его особенностей, а также работы wss, http requests. Возможно эта библиотека чем-то вас заинтересует =)

[Документация](https://github.com/aovzerk/aov.js/tree/main/doc/Сlient.md)

# Установка
Требуется Node.js 16.9.0 или новее.
```
npm install aov.js
```
# Код для создания бота с командой say для Discord

```js
const { Client } = require("aov.js");
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
```
