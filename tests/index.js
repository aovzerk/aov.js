const { Client } = require("../");
const yt_dl = require("youtube-dl-exec");
const cfg = require("./cfg.json");
const bot = new Client({ "intents": cfg.intents });

bot.on("READY", async user => {
	console.log(`${user.username}#${user.discriminator} запущен`);
});
const command = {
	"name": "ping",
	"type": 1,
	"description": "Ping bot"
};
let Voice = null;
const songs = [];
bot.on("MESSAGE_CREATE", async msg => {
	if (msg.d.author.id != bot.user.id) {
		const args = msg.d.content.split(" ");
		if (args[0] == "!c") {
			msg.guild.create_slash(command).catch(err => console.log(err));
		} else if (args[0] == "!play") {
			if (Voice == null) {
				const channel = await msg.guild.fetch_channel("942351300908175380");
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
				Voice = null;
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
			Voice = null;
		}
	});
}
bot.on("INTERACTION_CREATE", async i => {
	if (i.type == "SLASH" && i.d.data.name == "ping") {
		i.reply({ "content": "Pong", "ephemeral": true });
	}
});

bot.login(cfg.token);