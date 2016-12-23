/**
 * Feature
 */
qx.Class.define("ae.map.model.Style", {
	extend : qx.core.Object,
	
	properties : {

		/**
		 * stroke
		 */
		stroke : {
			//apply : "_applyCqlfilter",
			event : "changeStroke",
			init : null
		}
		
	},

	construct : function(){
		this.base(arguments);
		
	}
});
