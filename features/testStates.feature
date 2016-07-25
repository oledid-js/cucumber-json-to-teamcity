Feature: Test states
	As a developer using TeamCity
	I want to make sure that I can read the correct test states from TeamCity

Scenario: A passing test
	Given a passing test
	When I have translated it with this API
	Then TeamCity should be able to see that it is a passing test

Scenario: A failing test
	Given a failing test
	When I have translated it with this API
	Then TeamCity should be able to see that it is a failing test

Scenario: A pending test
	Given a pending test
	When I have translated it with this API
	Then TeamCity should be able to see that it is a pending test

Scenario: A test that throws an error
	Given a test that throws an error
	When I have translated it with this API
	Then TeamCity should be able to see that it is a test that throws an error

Scenario: An undefined test
	Given an undefined test
	When I have translated it with this API
	Then TeamCity should be able to see that it is an undefined test
