var Class = require('class');

/**
 * @class CollectionChange<T>
 * @namespace Collections
 */
var CollectionChange = Class.extend({
	/**
	 * @constructor
	 * @param {Collections.CollectionChange.Action} action
	 * @param {Number} index
	 * @param {Array<T>} oldItems
	 * @param {Array<T>} newItems
	 */
	constructor: function(action, index, oldItems, newItems) {
		this.action = action;
		this.index = index;
		this.oldItems = oldItems;
		this.newItems = newItems;
	}
}, {
	Action: {
		ADD: 0,
		REMOVE: 1,
		REPLACE: 2
	}
});

module.exports = CollectionChange;