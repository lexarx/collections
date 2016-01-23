define('collections/collection', [
	'class', 'collections/collection-interface'
], function(Class, CollectionInterface) {
	var emptyArray = [];

	/**
	 * @class Collection<T>
	 * @implements {Collections.CollectionInterface}
	 * @namespace Collections
	 */
	var Collection = Class.extend({
		/**
		 * @constructor
		 * @param {Array<T>} [items]
		 */
		constructor: function(items) {
			this.items = [];
			if (items) {
				this.setItems(items);
			}
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {T} item
		 */
		add: function(item) {
			this.items.push(item);
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Array<T>} items
		 */
		addRange: function(items) {
			if (items.length > 0) {
				this.items = this.items.concat(items);
			}
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @param {T} item
		 */
		insert: function(index, item) {
			if (index < 0 || index > this.items.length) {
				throw new Error('Index out of bounds.');
			}
			this.items.splice(index, 0, item);
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @param {Array<T>} items
		 */
		insertRange: function(index, items) {
			if (index < 0 || index > this.items.length) {
				throw new Error('Index out of bounds.');
			}
			if (items.length > 0) {
				var args = items.slice();
				args.unshift(index, 0);
				this.items.splice.apply(this.items, args);
			}
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {T} item
		 * @returns {Number}
		 */
		remove: function(item) {
			var index = this.indexOf(item);
			if (index !== -1) {
				this.items.splice(index, 1);
			}
			return index;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @returns {Array<T>}
		 */
		removeAt: function(index) {
			if (index < 0 || index >= this.items.length) {
				throw new Error('Index out of bounds.');
			}
			return this.items.splice(index, 1);
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @param {Number} count
		 * @returns {Array<T>}
		 */
		removeRange: function(index, count) {
			if (index < 0 || count < 0 || index + count > this.items.length) {
				throw new Error('Index out of bounds.');
			}
			if (count > 0) {
				return this.items.splice(index, count);
			}
			return emptyArray;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @returns {Array<T>}
		 */
		clear: function() {
			if (this.items.length > 0) {
				var oldItems = this.items;
				this.items = [];
				return oldItems;
			}
			return emptyArray;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @param {T} item
		 * @returns {T}
		 */
		set: function(index, item) {
			if (index < 0 || index >= this.items.length) {
				throw new Error('Index out of bounds.');
			}
			var oldItem = this.items[index];
			this.items[index] = item;
			return oldItem;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @param {Number} count
		 * @param {Array<T>} items
		 * @returns {Array<T>}
		 */
		replaceRange: function(index, count, items) {
			if (index < 0 || count < 0 || index + count > this.items.length) {
				throw new Error('Index out of bounds.');
			}
			if (count > 0 || items.length > 0) {
				var args = [index, count].concat(items);
				return this.items.splice.apply(this.items, args);
			}
			return emptyArray;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Array<T>} items
		 * @returns {Array<T>}
		 */
		setItems: function(items) {
			if (this.items.length > 0 || items.length > 0) {
				var oldItems = this.items;
				this.items = items.slice();
				return oldItems;
			}
			return emptyArray;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {T} item
		 * @returns {Boolean}
		 */
		contains: function(item) {
			return this.indexOf(item) !== -1;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {T} item
		 * @returns {Number}
		 */
		indexOf: function(item) {
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i] === item) {
					return i;
				}
			}
			return -1;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {T} item
		 * @returns {Number}
		 */
		lastIndexOf: function(item) {
			for (var i = this.items.length - 1; i >= 0; i--) {
				if (this.items[i] === item) {
					return i;
				}
			}
			return -1;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @returns {T}
		 */
		get: function(index) {
			if (index < 0 || index >= this.items.length) {
				throw new Error('Index out of bounds.');
			}
			return this.items[index];
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Number} index
		 * @param {Number} count
		 * @returns {Array<T>}
		 */
		getRange: function(index, count) {
			if (index < 0 || index >= this.items.length || index + count > this.items.length) {
				throw new Error('Index out of bounds.');
			}
			return this.items.slice(index, index + count);
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @returns {Array<T>}
		 */
		toArray: function() {
			return this.items.slice();
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Function} iterator
		 * @param {*} [context]
		 */
		each: function(iterator, context) {
			for (var i = 0; i < this.items.length; i++) {
				iterator.call(context, this.items[i]);
			}
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Function} iterator
		 * @param {*} [context]
		 * @returns {Boolean}
		 */
		every: function(iterator, context) {
			for (var i = 0; i < this.items.length; i++) {
				var value = iterator.call(context, this.items[i]);
				if (!value) {
					return false;
				}
			}
			return true;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Function} iterator
		 * @param {*} [context]
		 * @returns {T}
		 */
		find: function(iterator, context) {
			for (var i = 0; i < this.items.length; i++) {
				var value = iterator.call(context, this.items[i]);
				if (value) {
					return this.items[i];
				}
			}
			return undefined;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @returns {T}
		 */
		first: function() {
			return this.items.length > 0 ? this.items[0] : undefined;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @returns {T}
		 */
		last: function() {
			return this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @param {Function} iterator
		 * @param {*} [context]
		 * @returns {Array}
		 */
		map: function(iterator, context) {
			var values = [];
			for (var i = 0; i < this.items.length; i++) {
				var value = iterator.call(context, this.items[i]);
				values.push(value);
			}
			return values;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @returns {Number}
		 */
		count: function() {
			return this.items.length;
		},

		/**
		 * @implements {Collections.CollectionInterface}
		 * @returns {Boolean}
		 */
		isEmpty: function() {
			return this.items.length === 0;
		}
	});
	
	CollectionInterface.addTo(Collection);
	
	return Collection;
});