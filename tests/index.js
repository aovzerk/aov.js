const { Client } = require("../");
const yt_dl = require("youtube-dl-exec");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`)
});

let Voice = null;
const songs = [];
const voice_id = "942351300908175380";
bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		const args = msg.d.content.split(" ");
		if (args[0] == "!play") {
			if (Voice == null) {
				const channel = await msg.guild.fetch_channel(voice_id);
				Voice = await channel.join();
				analys_song();
				const stream = yt_dl.exec(args[1], {
					"o": "-",
					"q": "",
					"f": "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio",
					"r": "100K" }, { "stdio": ["ignore", "pipe", "ignore"] });
				Voice.play(stream.stdout);
			} else if (Voice.loading_track == 1) {
				songs.push(args[1]);
			}

		} else if (args[0] == "!stop") {
			Voice.leave();
		} else if (args[0] == "!skip") {
			Voice.stop();
			const song = songs.shift();
			if (song) {
				const stream = yt_dl.exec(song, {
					"o": "-",
					"q": "",
					"f": "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio",
					"r": "100K" }, { "stdio": ["ignore", "pipe", "ignore"] });
				Voice.play(stream.stdout);
			} else {
				Voice.leave();
			}

		}
	}
});
function analys_song() {
	Voice.on("end", s => {
		Voice.stop();
		const song = songs.shift();
		if (song) {
			const stream = yt_dl.exec(song, {
				"o": "-",
				"q": "",
				"f": "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio",
				"r": "100K" }, { "stdio": ["ignore", "pipe", "ignore"] });
			Voice.play(stream.stdout);
		} else {
			Voice.leave();
		}
	});
}

bot.login(cfg.token);