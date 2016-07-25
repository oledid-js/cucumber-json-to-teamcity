"use strict";

const childProcess = require("child_process");
const path = require("path");
const os = require("os");
const expect = require("chai").expect;

const spawn = childProcess.spawn;

module.exports = function () {
	this.Given(/^an? (.*) test$/, (type, callback) => {
		this.type = type;
		callback();
	});

	this.Given("a test that throws an error", callback => {
		callback();
	});

	this.When("I have translated it with this API", callback => {
		callback();
	});

	this.Then(/^TeamCity should be able to see that it is (.*)$/, (testType, callback) => {
		let output = "";

		const cucumberPath = os.platform() === "win32" ?
			"../node_modules/.bin/cucumber-js.cmd" :
			"../node_modules/.bin/cucumber-js";

		const cucumberProcess = spawn(path.join(__dirname, cucumberPath), [
			"features/resources/mock.feature",
			"--format",
			"json",
			"--tags",
			getTagFromType(this.type)
		], {
			cwd: path.join(__dirname, "../"),
			encoding: "utf8"
		});

		cucumberProcess.stdout.on("data", data => {
			output += data.toString();
		});

		cucumberProcess.on("close", () => {
			processOutput(this.type, output, callback);
		});
	});
};

function getTagFromType(type) {
	switch (type) {
		case "passing":
			return "@passing";
		case "failing":
			return "@failing";
		case "pending":
			return "@pending";
		case "test that throws an error":
			return "@throws";
		case "undefined": {
			return "@undefined";
		}
		default:
			throw new Error(`Not implemented: getTagFromType with value ${type}`);
	}
}

function processOutput(type, output, callback) {
	const indexOfThenStep = 3;
	switch (type) {
		case "passing":
			expect(JSON.parse(output)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("passed");
			callback();
			break;
		case "failing":
			expect(JSON.parse(output)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("failed");
			callback();
			break;
		case "pending":
			expect(JSON.parse(output)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("pending");
			callback();
			break;
		case "ignored":
			expect(JSON.parse(output)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("pending");
			callback();
			break;
		case "test that throws an error":
			expect(JSON.parse(output)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("failed");
			callback();
			break;
		case "undefined":
			expect(JSON.parse(output)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("undefined");
			callback();
			break;
		default:
			throw new Error(`Not implemented: processOutput with value ${type}`);
	}
}
