const { Client } = require("../");
// const fs = require("fs");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });
const yt_dl = require("youtube-dl-exec");
bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("MESSAGE_CREATE", async msg => {
	msg.guild.fetch_channel("942351300908175380").then(async channel => {
		const Voice = await channel.join();

		const stream = yt_dl.exec("https://www.youtube.com/watch?v=Jm932Sqwf5E", {
			"o": "-",
			"q": "",
			"f": "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio",
			"r": "100K" }, { "stdio": ["ignore", "pipe", "ignore"] });
		Voice.play(stream.stdout);
		stream.stdout;
		setTimeout(() => Voice.leave(), 10000);
	}).catch(err => console.log(err));
});

bot.login(cfg.token);