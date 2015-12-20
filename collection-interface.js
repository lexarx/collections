define('collections/collection-interface', [
	'interface'
], function(Interface) {
	/**
	 * @interface CollectionInterface
	 * @namespace Collections
	 * @method add
	 * @method addRange
	 * @method insert
	 * @method insertRange
	 * @method remove
	 * @method removeAt
	 * @method removeRange
	 * @method clear
	 * @method set
	 * @method replaceRange
	 * @method setItems
	 * @method contains
	 * @method indexOf
	 * @method lastIndexOf
	 * @method get
	 * @method getRange
	 * @method toArray
	 * @method each
	 * @method find
	 * @method first
	 * @method last
	 * @method map
	 * @method count
	 * @method isEmpty
	 */
	return new Interface();
});