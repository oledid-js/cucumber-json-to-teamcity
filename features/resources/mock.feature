@mockup
Feature: A mock feature
	As a developer
	I want to have a feature I can use for testing
	In order to implement this test-formatting API

@passing
Scenario: A passing test
	Given something
	When something
	Then the test should pass

@failing
Scenario: A failing test
	Given something
	When something
	Then the test should fail

@pending
Scenario: A pending test
	Given something
	When something
	Then the test should be ignored

@throws
Scenario: A test that throws an error
	Given something
	When something
	Then the test should throw an error

@undefined
Scenario: An undefined test
	Given something
	When something
	Then the test is not defined
