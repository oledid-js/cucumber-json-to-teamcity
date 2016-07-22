Feature: Escaping values
	As a teamcity instance
	I want to receive escaped values in all service messages
	In order to be able to parse the service messages

Scenario: Escaping apostrophe
	Given a string It's fun to test
	When the string is escaped
	Then the string should be It|'s fun to test

Scenario: Escaping line feed (\n) and carriage return (\r)
	Given a haiku by Issa
	When the string is escaped
	Then the haiku should be escaped

Scenario: Escaping the vertical bar (|)
	Given a string Poker face? :|
	When the string is escaped
	Then the string should be Poker face? :||

Scenario: Escaping brackets
	Given a string [oledid](https://github.com/oledid)
	When the string is escaped
	Then the string should be |[oledid|](https://github.com/oledid)

Scenario: Escaping unicode symbols
	Given a string Copyright ©
	When the string is escaped
	Then the unicode string should be escaped
