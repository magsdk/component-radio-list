Radio list component
====================

[![build status](https://img.shields.io/travis/magsdk/component-radio-list.svg?style=flat-square)](https://travis-ci.org/magsdk/component-radio-list)
[![npm version](https://img.shields.io/npm/v/mag-component-radio-list.svg?style=flat-square)](https://www.npmjs.com/package/mag-component-radio-list)
[![dependencies status](https://img.shields.io/david/magsdk/component-radio-list.svg?style=flat-square)](https://david-dm.org/magsdk/component-radio-list)
[![devDependencies status](https://img.shields.io/david/dev/magsdk/component-radio-list.svg?style=flat-square)](https://david-dm.org/magsdk/component-radio-list?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/magsdk)


Radio list is a component to build user interface, an instance of [Component](https://github.com/spasdk/component) module.
It is based on [mag-component-list](https://github.com/magsdk/component-list).


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
    classIcon: 'theme-icon theme-icon-checkbox',
    classIconActive: 'theme-icon theme-icon-checkbox-active',
    classChecked: 'checked',
    data: [
        {state: false, title: 'Some title 1', value: 'string'},
        {state: true, title: 'Some title 2', value: 'number'},
        {state: false, title: 'Some title 3', value: 'object'}
    ]
});
```

To change data after creation:

```js
radioList.setData({
    focusIndex: 0,
    data: [
        {state: false, title: 'Some title 1', value: 'value 1'},
        {state: true, title: 'Some title 2', value: 'value 2'},
        {state: false, title: 'Some title 3', value: 'value 3'}
    ]
});
```

To change item state:

```js
radioList.checkIndex(index);
```

To reset to init state (data and focusIndex):

```js
radioList.resetData();
```

To uncheck all items:

```js
radioList.clearChecked(newFocusPosition);
```

To get checked item data:

```js
console.log(radioList.checkedData);
```


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/magsdk/component-radio-list/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`mag-component-radio-list` is released under the [MIT License](license.md).
