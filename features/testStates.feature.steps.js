"use strict";

const childProcess = require("child_process");
const path = require("path");
const os = require("os");
const expect = require("chai").expect;
const api = require("../src/index");

const spawn = childProcess.spawn;

module.exports = function () {
	this.Given(/^an? (.*) test$/, (type, callback) => {
		this.type = type;
		callback();
	});

	this.Given("a test that throws an error", callback => {
		this.type = "test that throws an error";
		callback();
	});

	this.When("I have translated it with this API", callback => {
		callback();
	});

	this.Then(/^TeamCity should be able to see that it is (.*)$/, (testType, callback) => {
		let json = "";

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
			json += data.toString();
		});

		cucumberProcess.on("close", () => {
			processOutput(this.type, json, callback);
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

function processOutput(type, json, callback) {
	const output = api(json).join("\n");
	const indexOfThenStep = 3;
	switch (type) {
		case "passing":
			expect(JSON.parse(json)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("passed");
			expect(output.replace(/ duration='[0-9]*'/g, "")).to.equal(`##teamcity[testSuiteStarted name='A passing test']\n##teamcity[testStarted name='Before ' captureStandardOutput='false']\n##teamcity[testFinished name='Before ']\n##teamcity[testStarted name='Given something' captureStandardOutput='false']\n##teamcity[testFinished name='Given something']\n##teamcity[testStarted name='When something' captureStandardOutput='false']\n##teamcity[testFinished name='When something']\n##teamcity[testStarted name='Then the test should pass' captureStandardOutput='false']\n##teamcity[testFinished name='Then the test should pass']\n##teamcity[testStarted name='After ' captureStandardOutput='false']\n##teamcity[testFinished name='After ']\n##teamcity[testSuiteFinished name='A passing test']`);
			callback();
			break;
		case "failing":
			expect(JSON.parse(json)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("failed");
			expect(output).to.have.string("##teamcity[testFailed name='Then the test should fail'");
			callback();
			break;
		case "pending":
			expect(JSON.parse(json)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("pending");
			expect(output).to.have.string("##teamcity[testIgnored name='Then the test should be ignored'");
			callback();
			break;
		case "test that throws an error":
			expect(JSON.parse(json)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("failed");
			expect(output).to.have.string("##teamcity[testFailed name='Then the test should throw an error'");
			callback();
			break;
		case "undefined":
			expect(JSON.parse(json)[0].elements[0].steps[indexOfThenStep].result.status).to.equal("undefined");
			expect(output).to.have.string("##teamcity[testIgnored name='Then the test is not defined'");
			callback();
			break;
		default:
			throw new Error(`Not implemented: processOutput with value ${type}`);
	}
}
