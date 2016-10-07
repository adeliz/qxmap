/**
 * Tiled layer
 */
qx.Class.define("ae.map.model.layer.Tile", {
	extend : qx.core.Object,

	properties : {

		/**
		 * CQL Filter
		 */
		source : {
			//apply : "_applyCqlfilter",
			event : "changeSource",
			init : null
		}
		
	},
	
	/**
	 * @param name {String} Layer's name (whatever you want)
	 * @param url {String} url
	 * @param layer {String} layer's name (name on the server)	
	 * @param singleTile {Boolean} single tile or not
	 */
	construct : function(){
		this.base(arguments);
		
	}

});
