"use strict";

const expect = require("chai").expect;
const escapeString = require("../escapeString");

module.exports = function () {
	this.Given(/^a string (.*)$/, function (input, callback) {
		this.input = input;
		callback();
	});

	this.Given(/^a haiku by Issa$/, function (callback) {
		this.input = "A lovely thing to see:\r\nthrough the paper window's hole,\r\nthe Galaxy.";
		callback();
	});

	this.When(/^the string is escaped$/, function (callback) {
		this.output = escapeString(this.input);
		callback();
	});

	this.Then(/^the string should be (.*)$/, function (expected, callback) {
		expect(this.output).to.equal(expected);
		callback();
	});

	this.Then(/^the haiku should be escaped$/, function (callback) {
		const expected = "A lovely thing to see:|r|nthrough the paper window|'s hole,|r|nthe Galaxy.";
		expect(this.output).to.equal(expected);
		callback();
	});

	this.Then(/^the unicode string should be escaped$/, callback => {
		callback(null, "pending");
	});
};
