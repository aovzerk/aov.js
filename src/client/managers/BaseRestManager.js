/* eslint-disable no-async-promise-executor */
"use strict";
const fetch = require("node-fetch");
const API_STATUS = require("../../consts/api_status.json");
class BaseRestManager {
	send_data(options) {
		const { method, body, url, token } = options;
		let { get_json } = options;
		if (get_json == undefined) get_json = true;
		return new Promise((result, reject) => {
			fetch(url, {
				"method": method,
				"body": body,
				"headers": {
					"Authorization": `Bot ${token}`,
					"Content-Type": "application/json"
				}
			}).then(response => {
				if (response.status == API_STATUS.OK || response.status == API_STATUS.NOT_CONTENT || response.status == API_STATUS.CREATED) {
					if (get_json) {
						const data = response.json();
						result(data);
					} else {
						result("Complete");
					}
				} else {
					reject({ "Error_status": response.status, "Error_url": response.url, "Error_text": response.statusText, "body": JSON.parse(body) });
				}
			}).catch(err => reject(err));

		});

	}
}
module.exports = BaseRestManager;