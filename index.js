/**
 * @license The MIT License (MIT)
 * @copyright Boris Aleynikov <aleynikov.boris@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var List               = require('mag-component-list'),
    CLASS_ACTIVE       = 'checked',
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
 * Set data and render inner structures and HTML.
 *
 * @param {Object} config init parameters (subset of constructor config params)
 */
RadioList.prototype.setData = function ( config ) {
    List.prototype.setData.call(this, config);

    this.defaultCheckedIndex = this.checkedIndex;

    if ( this.$focusItem ) {
        this.defaultFocusIndex = this.$focusItem.index;
    } else {
        this.defaultFocusIndex = 0;
    }
};


/**
 * Reset data to default state and render inner structures and HTML.
 */
RadioList.prototype.resetData = function () {
    this.checkIndex(this.defaultCheckedIndex);
    this.focusIndex(this.defaultFocusIndex);
};


/**
 * Set all states to false and render inner structures and HTML.
 *
 * @param {number} focusIndex focus index
 */
RadioList.prototype.clearChecked = function ( focusIndex ) {
    var index = 0;

    for ( index; index < this.data.length; index++ ) {
        this.data[index].state = false;
    }

    if ( !focusIndex && focusIndex !== 0 ) {
        focusIndex = this.$focusItem ? this.$focusItem.index : 0;
    }

    this.setData({data: this.data, focusIndex: focusIndex});
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

        if ( data.state ) {
            $item.classList.add(CLASS_ACTIVE);
            $item.checkBox.className = ICON_RADIO_ACTIVE;
        } else {
            $item.classList.remove(CLASS_ACTIVE);
            $item.checkBox.className = ICON_RADIO;
        }

        $item.state = data.state;
        $item.value = data.value;

    } else {
        $item.innerHTML = '';
        table = document.createElement('table');
        tr = document.createElement('tr');
        td = document.createElement('td');
        check = document.createElement('div');

        if ( data.state ) {
            $item.classList.add(CLASS_ACTIVE);
            check.className = ICON_RADIO_ACTIVE;
        } else {
            $item.classList.remove(CLASS_ACTIVE);
            check.className = ICON_RADIO;
        }

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
    var $node;

    if ( DEVELOP ) {
        if ( index >= this.data.length ) {
            throw new Error(__filename + ': wrong index to check');
        }
    }

    // do not need to do the same
    if ( index === this.checkedIndex ) { return; }

    if ( this.checkedIndex !== null && this.$node.children.length ) {
        this.data[this.checkedIndex].state = false;
        $node = this.getItemNodeByIndex(this.checkedIndex);
        if ( $node ) {
            $node.checkBox.className = ICON_RADIO;
            $node.classList.remove(CLASS_ACTIVE);
        }
    }

    $node = this.getItemNodeByIndex(index);
    if ( $node ) {
        $node.checkBox.className = ICON_RADIO_ACTIVE;
        $node.classList.add(CLASS_ACTIVE);
        $node.state = true;
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

    index -= this.viewIndex;
    if ( index < this.size && index >= 0 ) {
        return children[index];
    }

    return null;
};

RadioList.prototype.renderItem = RadioList.prototype.renderItemDefault;

module.exports = RadioList;
