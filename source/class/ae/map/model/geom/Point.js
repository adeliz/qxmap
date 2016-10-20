/**
 * Point
 */
qx.Class.define("ae.map.model.geom.Point", {
	extend : qx.core.Object,
	
	properties : {

		/**
		 * Source
		 */
		coordinates : {
			//apply : "_applyCqlfilter",
			event : "changeCoordinates",
			init : null
		}
		
	},

	construct : function(){
		this.base(arguments);
		
	}
});
