/**
 * @license The MIT License (MIT)
 * @copyright Boris Aleynikov <aleynikov.boris@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var List               = require('mag-component-list'),
    ICON_RADIO         = 'theme-icon theme-icon-radio',
    ICON_RADIO_ACTIVE  = 'theme-icon theme-icon-radio-active';


/**
 * Base radio list implementation
 *
 * @constructor
 * @extends List
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 */
function RadioList ( config ) {
    var self = this;


    /**
     * Checked item data
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

    List.call(this, config);

    this.addListener('click:item', function ( event ) {
        var $item = event.$item,
            previousCheckedData = self.checkedData;

        self.checkIndex($item.index);

        if ( previousCheckedData !== $item.data ) {
            /**
             * Select element from list
             *
             * @event select
             * @property {Element} $item object
             */
            self.emit('select', $item);
        }
    });
}


RadioList.prototype = Object.create(List.prototype);
RadioList.prototype.constructor = RadioList;

// set component name
RadioList.prototype.name = 'mag-component-radio-list';

RadioList.prototype.init = function ( config ) {
    config = config || {};
    List.prototype.init.call(this, config);
};


/**
 * Default render function
 *
 * @param {Element} $item in list
 * @param {Object} data to render layout element
 * @param {string} [data.title] title of checkbox
 * @param {boolean} [data.state] state of checkbox: checked or not
 * @param {string} [data.value] special value of item
 */
RadioList.prototype.renderItemDefault = function ( $item, data ) {
    var table,
        tr,
        td,
        check;

    if ( $item.ready ) {
        $item.$title.innerText = data.title || '';
        $item.checkBox.className = data.state ? ICON_RADIO_ACTIVE : ICON_RADIO;

        $item.state = data.state;
        $item.value = data.value;

    } else {
        table = document.createElement('table');
        tr = document.createElement('tr');
        td = document.createElement('td');
        check = document.createElement('div');
        check.className = data.state ? ICON_RADIO_ACTIVE : ICON_RADIO;

        table.appendChild(tr);
        td.appendChild(check);

        td.className = 'checkBoxWrapper';
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = 'title';
        td.innerText = data.title || '';
        tr.appendChild(td);

        $item.checkBox = check;
        $item.state = data.state;
        $item.value = data.value;
        $item.$title = td;

        $item.appendChild(table);

        if ( data.state ) {
            this.checkedData = data;
            this.checkedIndex = $item.index;
        }

        $item.ready = true;
    }
};

/**
 * Check element by index
 *
 * @param {number} index of element to check
 */
RadioList.prototype.checkIndex = function ( index ) {
    var node;

    if ( DEVELOP ) {
        if ( index >= this.data.length ) {
            throw new Error(__filename + ': wrong index to check');
        }
    }

    // do not need to do the same
    if ( index === this.checkedIndex ) { return; }

    if ( this.checkedIndex !== null && this.$node.children.length ) {
        this.data[this.checkedIndex].state = false;
        node = this.getItemNodeByIndex(this.checkedIndex);
        if ( node ) {
            node.checkBox.className = ICON_RADIO;
        }
    }

    node = this.getItemNodeByIndex(index);
    if ( node ) {
        node.checkBox.className = ICON_RADIO_ACTIVE;
        node.state = true;
    }

    this.data[index].state = true;
    this.checkedData = this.data[index];
    this.checkedIndex = index;
};


/**
 * Get list item node by item index
 *
 * @param {number} index of item to find node
 * @return {?Element} item node link
 */
RadioList.prototype.getItemNodeByIndex = function ( index ) {
    var children = this.$node.children;

    if ( index <= this.size + this.viewIndex && this.data.length - this.viewIndex >= this.size ) {
        return children[index - this.viewIndex];
    }

    return null;
};

RadioList.prototype.renderItem = RadioList.prototype.renderItemDefault;

module.exports = RadioList;
