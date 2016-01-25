define('collections/observable-collection-interface', [
	'interface', 'collections/collection-interface'
], function(Interface, CollectionInterface) {
	/**
	 * @interface ObservableCollectionInterface
	 * @namespace Collections
	 * @extends CollectionInterface
	 * @property {Event} changed
	 */
	return new Interface([
		CollectionInterface
	]);
});