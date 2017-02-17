/**
 * @license The MIT License (MIT)
 * @copyright Aleynikov Boris <alynikov.boris@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var List = require('mag-component-list'),
    CheckBox = require('spa-component-checkbox'),
    counter = 0;


/**
 * Base radio list implementation
 *
 * @constructor
 * @extends List
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 */
function RadioList ( config ) {
    var self = this,
        groupName = 'radio-list-' + counter++,
        index;


    /**
     * Array of checkbox components
     *
     * @type {Array}
     */
    this.group = [];

    /**
     * Link to checked item
     *
     * @type {Element}
     */
    this.checkedData = null;

    /**
     * Checked element index
     *
     * @type {number}
     */
    this.checkedIndex = null;


    for ( index = 0; index < config.data.length; index++ ) {
        this.group.push(new CheckBox({
            group: groupName,
            value: config.data[index].state
        }));
        if ( config.data[index].state ) {
            this.checkedData = config.data[index];
            this.checkedIndex = index;
        }
    }


    List.call(this, config);

    this.addListener('click:item', function ( event ) {
        var $item = event.$item;

        $item.checkBox.set(true);
        $item.state = $item.checkBox.value;
        $item.data.state = $item.checkBox.value;

        if ( self.checkedData !== $item.data ) {
            /**
             * Select element from list
             *
             * @event select
             * @property {Element} $item object
             */
            self.emit('select', $item);
            if ( self.checkedData ) { self.checkedData.state = false; }
            self.checkedData = $item.data;
            self.checkedIndex = $item.index;
        }
    });
}


RadioList.prototype = Object.create(List.prototype);
RadioList.prototype.constructor = RadioList;

// set component name
RadioList.prototype.name = 'mag-component-radio-list';

RadioList.prototype.group = 0;


/**
 * Default render function
 *
 * @param {Element} $item in list
 * @param {Array} data to render layout element
 * @param {string} [data.title] title of checkbox
 * @param {boolean} [data.state] state of checkbox: checked or not
 * @param {string} [data.value] special value of item
 */
RadioList.prototype.renderItemDefault = function ( $item, data ) {
    var table = document.createElement('table'),
        tr = document.createElement('tr'),
        td = document.createElement('td'),
        check = this.group[$item.index];


    $item.innerHTML = '';

    table.appendChild(tr);

    td.appendChild(check.$node);
    td.className = 'checkBoxWrapper';
    tr.appendChild(td);

    td = document.createElement('td');
    td.className = 'title';
    td.innerText = data.title || '';
    tr.appendChild(td);

    $item.checkBox = check;

    $item.state = check.value;
    $item.value = data.value;


    $item.appendChild(table);
};

/**
 * Check element by index
 *
 * @param {number} index of element to check
 */
RadioList.prototype.checkIndex = function ( index ) {
    if ( DEVELOP ) {
        if ( index >= this.data.length ) {
            throw new Error(__filename + ': wrong index to check');
        }
    }

    // do not need to do the same
    if ( index === this.checkedIndex ) { return; }


    this.group[index].set(true);
    this.data[index].state = true;
    this.data[this.checkedIndex].state = false;
    this.checkedData = this.data[index];
    this.checkedIndex = index;
};


RadioList.prototype.renderItem = RadioList.prototype.renderItemDefault;


module.exports = RadioList;
