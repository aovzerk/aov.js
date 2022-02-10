class Role {
	constructor(data) {
		this.data = data;
	}
	toString() {
		return `<@&${this.data.id}>`;
	}
}
module.exports = Role;