"use strict";

const expect = require("chai").expect;
const {Before, After, Given, Then} = require("cucumber");

Before((scenario, callback) => {
	callback();
});

After((scenario, callback) => {
	callback();
});

Given("something", callback => {
	callback();
});

Then(/^the test should (.*)$/, (what, callback) => {
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

		case "be pending": {
			callback(null, "pending");
			break;
		}

		case "be skipped": {
			callback(null, "skipped");
			break;
		}

		default:
		case "throw an error": {
			throw new Error("I am an error");
		}
	}
});
