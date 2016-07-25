"use strict";

const expect = require("chai").expect;

module.exports = function () {
	this.Before((scenario, callback) => {
		callback();
	});

	this.After((scenario, callback) => {
		callback();
	});

	this.Given("something", callback => {
		callback();
	});

	this.Then(/^the test should (.*)$/, (what, callback) => {
		switch (what) {
			case "pass": {
				callback();
				break;
			}

			case "fail": {
				expect(true).to.equal(false);
				callback();
				break;
			}

			default:
			case "throw an error": {
				throw new Error("I am an error");
			}

			case "be ignored": {
				callback(null, "pending");
			}
		}
	});
};
