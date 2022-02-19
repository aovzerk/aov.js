class Embed {
	constructor() {
		this.title = null;
		this.description = null;
		this.url = null;
		this.timestamp = null;
		this.color = null;
		this.footer = null;
		this.image = null;
		this.thumbnail = null;
		this.video = null;
		this.provider = null;
		this.author = null;
		this.fields = [];
	}
	setTitle(title) {
		this.title = title;
		return this;
	}
	setDescription(desc) {
		this.description = desc;
		return this;
	}
	setUrl(url) {
		this.url = url;
		return this;
	}
	setTimestamp(time) {
		this.timestamp = time;
		return this;
	}
	setColor(color) {
		this.color = color;
		return this;
	}
	setFooter(footer) {
		this.footer = footer;
		return this;
	}
	setImage(image_url) {
		this.image = image_url;
		return this;
	}
	setThumbnail(thumbnail) {
		this.thumbnail = thumbnail;
		return this;
	}
	setVideo(video) {
		this.video = video;
		return this;
	}
	setProvider(provider) {
		this.provider = provider;
		return this;
	}
	setAuthor(author) {
		this.author = author;
	}
	addField(field) {
		this.fields.push(field);
		return this;
	}
	toJSON() {
		return {
			"title": this.title,
			"description": this.description,
			"url": this.url,
			"timestamp": this.timestamp,
			"color": this.color,
			"footer": this.footer,
			"image": this.image,
			"thumbnail": this.thumbnail,
			"video": this.video,
			"provider": this.provider,
			"author": this.author,
			"fields": this.fields
		};
	}
}
module.exports = Embed;