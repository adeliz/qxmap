/**
 * LineString
 */
qx.Class.define("ae.map.model.geom.LineString", {
	extend : qx.core.Object,
	
	properties : {

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
