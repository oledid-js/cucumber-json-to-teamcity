Feature: API usage
	As a developer
	I want to translate output from Cucumber.js in json format to TeamCity service messages
	In order to see which tests passed or failed in TeamCity

Scenario: Calling the API with invalid arguments
	Given that I do not know how to use this api
	When I try to call it with an invalid number of arguments
	Then I should see a helpful error message

Scenario: Calling the API with a json-string
	Given that I know how to use this api
	When I call it with a json-string as the single argument
	Then I should see the correct TeamCity service messages

Scenario: Calling the API with a file path
	Given that I know how to use this api
	When I call it with a file path as the single argument
	Then I should see the correct TeamCity service messages
