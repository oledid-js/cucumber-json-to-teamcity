"use strict";

const expect = require("chai").expect;
const {Given, When, Then} = require("cucumber");

const escapeString = require("../src/escapeString");

Given(/^a string (.*)$/, function (input, callback) {
	this.input = input;
	callback();
});

Given(/^a haiku by Issa$/, function (callback) {
	this.input = "A lovely thing to see:\r\nthrough the paper window's hole,\r\nthe Galaxy.";
	callback();
});

When(/^the string is escaped$/, function (callback) {
	this.output = escapeString(this.input);
	callback();
});

Then(/^the string should be (.*)$/, function (expected, callback) {
	expect(this.output).to.equal(expected);
	callback();
});

Then(/^the haiku should be escaped$/, function (callback) {
	const expected = "A lovely thing to see:|r|nthrough the paper window|'s hole,|r|nthe Galaxy.";
	expect(this.output).to.equal(expected);
	callback();
});

Then(/^the unicode string should be escaped$/, callback => {
	callback(null, "pending");
});
