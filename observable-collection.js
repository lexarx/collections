var Collection = require('collections/collection');
var Event = require('event');
var CollectionChange = require('collections/collection-change');
var ObservableCollectionInterface = require('collections/observable-collection-interface');

var emptyArray = [];

/**
 * @class ObservableCollection<T>
 * @extends Collections.Collection
 * @implements {Collections.ObservableCollectionInterface}
 * @namespace Collections
 */
var ObservableCollection = Collection.extend({
	/**
	 * @constructor
	 * @override
	 * @param {Array<T>} [items]
	 */
	constructor: function(items) {
		/**
		 * @implements {Collections.ObservableCollectionInterface}
		 */
		this.changed = new Event();
		this.super(items);
	},

	/**
	 * @override
	 * @param {T} item
	 */
	add: function(item) {
		var index = this.items.length;
		this.super(item);
		this.notifyChanged(index, emptyArray, [item]);
	},

	/**
	 * @override
	 * @param {Array<T>} items
	 */
	addRange: function(items) {
		var index = this.items.length;
		this.super(items);
		if (items.length > 0) {
			this.notifyChanged(index, emptyArray, items);
		}
	},

	/**
	 * @override
	 * @param {Number} index
	 * @param {T} item
	 */
	insert: function(index, item) {
		this.super(index, item);
		this.notifyChanged(index, emptyArray, [item]);
	},

	/**
	 * @override
	 * @param {Number} index
	 * @param {Array<T>} items
	 */
	insertRange: function(index, items) {
		this.super(index, items);
		if (items.length > 0) {
			this.notifyChanged(index, emptyArray, items);
		}
	},

	/**
	 * @override
	 * @param {T} item
	 * @returns {Number}
	 */
	remove: function(item) {
		var index = this.super(item);
		if (index !== -1) {
			this.notifyChanged(index, [item], emptyArray);
		}
		return index;
	},

	/**
	 * @override
	 * @param {Number} index
	 * @returns {Array<T>}
	 */
	removeAt: function(index) {
		var oldItems = this.super(index);
		this.notifyChanged(index, oldItems, emptyArray);
		return oldItems;
	},

	/**
	 * @override
	 * @param {Number} index
	 * @param {Number} count
	 * @returns {Array<T>}
	 */
	removeRange: function(index, count) {
		var oldItems = this.super(index, count);
		if (oldItems.length > 0) {
			this.notifyChanged(index, oldItems, emptyArray);
		}
		return oldItems;
	},

	/**
	 * @overrides
	 * @returns {Array<T>}
	 */
	clear: function() {
		var oldItems = this.super();
		if (oldItems.length > 0) {
			this.notifyChanged(0, oldItems, emptyArray);
		}
		return oldItems;
	},

	/**
	 * @override
	 * @param {Number} index
	 * @param {T} item
	 * @returns {T}
	 */
	set: function(index, item) {
		var oldItem = this.super(index, item);
		this.notifyChanged(index, [oldItem], [item]);
		return oldItem;
	},

	/**
	 * @override
	 * @param {Number} index
	 * @param {Number} count
	 * @param {Array<T>} items
	 * @returns {Array<T>}
	 */
	replaceRange: function(index, count, items) {
		var oldItems = this.super(index, count, items);
		if (oldItems.length > 0 || items.length > 0) {
			this.notifyChanged(index, oldItems, items);
		}
		return oldItems;
	},

	/**
	 * @override
	 * @param {Array<T>} items
	 * @returns {Array<T>}
	 */
	setItems: function(items) {
		var oldItems = this.super(items);
		if (oldItems.length > 0 || items.length > 0) {
			this.notifyChanged(items, oldItems, items);
		}
		return oldItems;
	},

	/**
	 * @private
	 * @param {Number} index
	 * @param {Array} oldItems
	 * @param {Array} newItems
	 */
	notifyChanged: function(index, oldItems, newItems) {
		var action;
		if (oldItems.length > 0 && newItems.length > 0) {
			action = CollectionChange.Action.REPLACE;
		} else if (oldItems.length) {
			action = CollectionChange.Action.REMOVE;
		} else {
			action = CollectionChange.Action.ADD;
		}
		var change = new CollectionChange(action, index, oldItems, newItems);
		this.changed.trigger(this, change);
	}
});

ObservableCollectionInterface.addTo(ObservableCollection);

module.exports = ObservableCollection;