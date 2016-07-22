"use strict";

const fs = require("fs");
const path = require("path");
const expect = require("chai").expect;
const api = require("../src/index");

module.exports = function () {
	this.Given(/^(that I do not know how to use this api)|(that I know how to use this api)$/, (dummy1, dummy2, callback) => {
		callback();
	});

	this.When(/^I try to call it with an invalid number of arguments$/, function (callback) {
		this.invalidApiCalls = [];
		this.invalidApiCalls.push(api.bind(api));
		this.invalidApiCalls.push(api.bind(api, null));
		this.invalidApiCalls.push(api.bind(api, 1));
		this.invalidApiCalls.push(api.bind(api, "{}", "abc"));
		callback();
	});

	this.Then(/^I should see a helpful error message$/, function () {
		expect(this.invalidApiCalls.length > 0).to.equal(true);
		for (let i = 0; i < this.invalidApiCalls.length; ++i) {
			expect(this.invalidApiCalls[i]).to.throw(Error);
		}
	});

	this.When(/^I call it with a json-string as the single argument$/, function (callback) {
		fs.readFile(path.join(__dirname, "resources/cucumberJson.json"), {
			encoding: "utf8"
		}, (err, data) => {
			if (err) {
				throw err;
			}
			this.result = api.bind(api, data);
			callback();
		});
	});

	this.When(/^I call it with a file path as the single argument$/, function () {
		this.result = api.bind(api, path.join(__dirname, "resources/cucumberJson.json"));
	});

	this.Then(/^I should see the correct TeamCity service messages$/, function (callback) {
		const results = this.result.call();
		fs.readFile(path.join(__dirname, "resources/expectedOutput.txt"), "utf8", (err, data) => {
			if (err) {
				throw err;
			}
			expect(results).to.eql(data.split("\n"));
			callback();
		});
	});
};
