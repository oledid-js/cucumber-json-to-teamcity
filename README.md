# cucumber-json-to-teamcity [![Build Status](https://travis-ci.org/oledid-js/cucumber-json-to-teamcity.svg?branch=master)](https://travis-ci.org/oledid-js/cucumber-json-to-teamcity) [![npm](https://img.shields.io/npm/dt/cucumber-json-to-teamcity.svg)](https://www.npmjs.com/package/cucumber-json-to-teamcity) [![npm](https://img.shields.io/npm/v/cucumber-json-to-teamcity.svg)](https://www.npmjs.com/package/cucumber-json-to-teamcity)

Translate a cucumber.js json-report to teamcity service messages

## Install

```
$ npm install --save cucumber-json-to-teamcity
```


## Usage

```js
const api = require("cucumber-json-to-teamcity");

const lines = api("path/to/json-file.json");
for (let i = 0; i < lines.length; ++i) {
  console.log(lines[i]);
}

// the method also accepts the raw json data as string.
```


## Related

- [cucumber-json-to-teamcity-cli](https://github.com/oledid-js/cucumber-json-to-teamcity-cli) - CLI for this module


## License

[MIT](LICENSE)
