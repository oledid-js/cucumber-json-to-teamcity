"use strict";

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

Handlebars.registerHelper("milliseconds", ticks => {
	return new Date(ticks).getMilliseconds();
});

module.exports = function (jsonStringOrPath) {
	if (arguments.length !== 1 || !jsonStringOrPath || jsonStringOrPath.length === 0 || typeof jsonStringOrPath !== typeof "string") {
		throw new Error(`Invalid argument. Expected a single string argument containing either valid json or valid path to json file, but was actually: [${Array.prototype.slice.call(arguments).join(", ")}]`);
	}

	let content;
	if (jsonStringOrPath.startsWith("{") || jsonStringOrPath.startsWith("[")) {
		content = jsonStringOrPath;
	} else {
		content = fs.readFileSync(jsonStringOrPath, {
			encoding: "utf8"
		});
	}

	const templateCode = fs.readFileSync(path.join(__dirname, "template.html"), "utf8").replace(/<\/?script>/g, "");
	const template = Handlebars.compile(templateCode);

	const contentArray = JSON.parse(content);
	for (let i = 0; i < contentArray.length; ++i) {
		const elements = contentArray[i].elements;
		modifyElements(elements);
	}

	const output = [];
	const templateResult = template(contentArray).split("\n");
	for (let index = 0; index < templateResult.length; ++index) {
		const line = templateResult[index].trim();
		if (line.length > 0) {
			output.push(line);
		}
	}
	// fs.writeFileSync(path.join(__dirname, "expectedOutput.txt"), output.join("\n"), {encoding: "utf8" });
	return output;
};

function modifyElements(elements) {
	for (let elementIndex = 0; elementIndex < elements.length; ++elementIndex) {
		const element = elements[elementIndex];
		for (let stepIndex = 0; stepIndex < element.steps.length; ++stepIndex) {
			const step = element.steps[stepIndex];
			modifyStep(step);
		}
	}
}

function modifyStep(step) {
	step.failed = step.result.status === "failed";

	if (step.failed) {
		const newlineIndex = step.result.error_message.indexOf("\n");
		if (newlineIndex === -1) {
			step.errorMessage = step.result.error_message;
			step.stacktrace = "no stacktrace.";
		} else {
			step.errorMessage = step.result.error_message.substring(0, newlineIndex);
			step.stacktrace = step.result.error_message.substring(newlineIndex, step.result.error_message.length - newlineIndex);
		}
	}
}
