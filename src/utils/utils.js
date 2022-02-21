/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
"use strict";
const urls = require("../consts/urls.json");

function get_create_at_user(id) {
	const epoch = BigInt(urls.epoch); // epoch discord
	return Number((BigInt(id) >> BigInt(22)) + epoch);
}
module.exports.get_create_at_user = get_create_at_user;
