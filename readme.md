Footer component
================

[![build status](https://img.shields.io/travis/magsdk/component-radio-list.svg?style=flat-square)](https://travis-ci.org/magsdk/component-radio-list)
[![npm version](https://img.shields.io/npm/v/mag-component-radio-list.svg?style=flat-square)](https://www.npmjs.com/package/mag-component-radio-list)
[![dependencies status](https://img.shields.io/david/magsdk/component-radio-list.svg?style=flat-square)](https://david-dm.org/magsdk/component-radio-list)
[![devDependencies status](https://img.shields.io/david/dev/magsdk/component-radio-list.svg?style=flat-square)](https://david-dm.org/magsdk/component-radio-list?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/magsdk)


Footer is a component to build user interface, an instance of [Component](https://github.com/stbsdk/component) module.


## Installation ##

```bash
npm install mag-component-radio-list
```


## Usage ##

Add the constructor to the scope:

```js
var RadioList = require('mag-component-radio-list');
```

Create radio list instance:

```js
var radioList = new RadioList({
    focusIndex: 0,
    data: [
        {state: false, title: 'Some title 1', value: 'string'},
        {state: true, title: 'Some title 2', value: 'number'},
        {state: false, title: 'Some title 3', value: 'object'}
    ]
});
```


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/magsdk/component-radio-list/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`mag-component-radio-list` is released under the [MIT License](license.md).
