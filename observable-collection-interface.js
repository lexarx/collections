var Interface = require('interface');
var CollectionInterface = require('collections/collection-interface');

/**
 * @interface ObservableCollectionInterface
 * @namespace Collections
 * @extends CollectionInterface
 * @property {Event} changed
 */
var ObservableCollectionInterface = new Interface([
	CollectionInterface
]);

module.exports = ObservableCollectionInterface;