var Class = require('class');
var PoolInterface = require('collections/pool-interface');

/**
 * @class Pool<T>
 * @implements {Collections.PoolInterface}
 * @namespace Collections
 */
var Pool = Class.extend({
	/**
	 * @constructor
	 * @param {Function} constructor
	 * @param {Array} [args]
	 */
	constructor: function(constructor, args) {
		this.itemConstructor = this.createItemConstructor(constructor, args);
		this.items = [];
	},

	/**
	 * @protected
	 * @param {Function} constructor
	 * @param {Array} args
	 * @returns {Function}
	 */
	createItemConstructor: function(constructor, args) {
		var Item = function() {
			return constructor.apply(this, args);
		};
		Item.prototype = constructor.prototype;
		return Item;
	},

	/**
	 * @implements {Collections.PoolInterface}
	 * @returns {T}
	 */
	pop: function() {
		if (this.items.length > 0) {
			return this.items.pop();
		} else {
			return this.createItem();
		}
	},

	/**
	 * @protected
	 * @returns {T}
	 */
	createItem: function() {
		return new this.itemConstructor();
	},

	/**
	 * @implements {Collections.PoolInterface}
	 * @param {T} item
	 */
	pool: function(item) {
		this.items.push(item);
	}
});

PoolInterface.addTo(Pool);

module.exports = Pool;