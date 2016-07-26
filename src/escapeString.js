"use strict";

module.exports = function (str) {
	if (!str) {
		return "";
	}
	return str
		.replace(/\|/g, "||")
		.replace(/'/g, "|'")
		.replace(/\n/g, "|n")
		.replace(/\r/g, "|r")
		.replace(/\[/g, "|[")
		.replace(/\]/g, "|]")
		.trim();
};
