/**
 * Feature
 */
qx.Class.define("ae.map.model.Feature", {
	extend : qx.core.Object,
	
	properties : {

		/**
		 * Source
		 */
		geometry : {
			//apply : "_applyCqlfilter",
			event : "changeGeometry",
			init : null
		}
		
	},

	construct : function(){
		this.base(arguments);
		
	}
});
