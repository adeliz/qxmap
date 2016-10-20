/**
 * Source layer
 */
qx.Class.define("ae.map.model.layer.Vector", {
	extend : qx.core.Object,

	properties : {

		/**
		 * Source
		 */
		source : {
			//apply : "_applyCqlfilter",
			event : "changeSource",
			init : null
		}
		
	},
	
	construct : function(){
		this.base(arguments);
		
	}

});
