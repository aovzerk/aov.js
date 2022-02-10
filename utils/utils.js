/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
const fetch = require("node-fetch");
const consts = require("../consts.json");

async function send_data(options) {
	const { method, body, url, token } = options;
	let { get_json } = options;
	if (get_json == undefined) get_json = true;
	return new Promise(async (result, reject) => {
		const response = await fetch(url, {
			"method": method,
			"body": body,
			"headers": {
				"Authorization": `Bot ${token}`,
				"Content-Type": "application/json"
			}
		});
		if (response.status == consts.API_STATUS.OK || response.status == consts.API_STATUS.NOT_CONTENT || response.status == consts.API_STATUS.CREATED) {
			if (get_json) {
				const data = await response.json();
				result(data);
			} else {
				result("Complete");
			}
		} else {
			reject({ "Error_status": response.status, "Error_url": response.url, "Error_text": response.statusText, "body": JSON.parse(body) });
		}
	});

}
async function add_role(options) {
	const { url, token } = options;
	return new Promise(async (result, reject) => {
		send_data({ "method": "PUT", "body": null, "url": url, "token": token, "get_json": false }).catch(err => {
			reject(err);
		});

	});
}
async function del_role(options) {
	const { url, token } = options;
	return new Promise(async (result, reject) => {
		send_data({ "method": "DELETE", "body": null, "url": url, "token": token, "get_json": false }).catch(err => {
			reject(err);
		});

	});
}
async function delet_msg(options) {
	const { url, token } = options;
	return new Promise(async (result, reject) => {
		send_data({ "method": "DELETE", "body": null, "url": url, "token": token, "get_json": false }).catch(err => {
			reject(err);
		});
	});

}
async function Bulk_Delete(options) {
	const { chn_id, body, token } = options;
	const url = `${consts.base_url}/channels/${chn_id}/messages/bulk-delete`;
	return new Promise(async (result, reject) => {
		send_data({ "method": "POST", "body": body, "url": url, "token": token, "get_json": false }).catch(err => {
			reject(err);
		});
	});
}
async function get_data(options) {
	const { url, body, token } = options;
	return new Promise(async (result, reject) => {
		const response = await fetch(url, {
			"method": "GET",
			"body": body,
			"headers": {
				"Authorization": `Bot ${token}`,
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		result(data);
	});

}
function get_create_at_user(id) {
	const epoch = BigInt(consts.epoch); // epoch discord
	return Number((BigInt(id) >> BigInt(22)) + epoch);
}
module.exports.get_data = get_data;
module.exports.send_data = send_data;
module.exports.delet_msg = delet_msg;
module.exports.Bulk_Delete = Bulk_Delete;
module.exports.get_create_at_user = get_create_at_user;
module.exports.add_roles = add_role;
module.exports.del_roles = del_role;