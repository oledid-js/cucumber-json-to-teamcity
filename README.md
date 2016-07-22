# cucumber-json-to-teamcity

> Translate a cucumber.js json-report to teamcity service messages

## Install

```
$ npm install --save https://github.com/oledid/cucumber-json-to-teamcity.git
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


## License

MIT © [Ole Morten Didriksen](https://github.com/oledid)
