const { Client } = require("../");
// const fs = require("fs");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });
const yt_dl = require("youtube-dl-exec");

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
bot.on("MESSAGE_CREATE", async msg => {
	msg.guild.fetch_channel("942351300908175380").then(channel => {
		channel.join();
	}).catch(err => console.log(err));
});
bot.on("CREATE_VOICE_CONNECTION", Voice => {
	const stream = yt_dl.exec("https://www.youtube.com/watch?v=HsiY_ZsPXaY&ab_channel=lobster", {
		"o": "-",
		"q": "",
		"f": "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio",
		"r": "100K" }, { "stdio": ["ignore", "pipe", "ignore"] });
	// const stream = fs.createReadStream("./test3.ogg");

	Voice.play(stream.stdout);
	Voice.on("End", () => {
		console.log("emit");
		const stream2 = yt_dl.exec("https://youtu.be/Gtv40bOE3U4", {
			"o": "-",
			"q": "",
			"f": "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio",
			"r": "100K" }, { "stdio": ["ignore", "pipe", "ignore"] });
		// const stream = fs.createReadStream("./test3.ogg");

		Voice.play(stream2.stdout);
	});


});

bot.login(cfg.token);