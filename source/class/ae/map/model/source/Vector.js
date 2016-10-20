/**
 * Vector source
 */
qx.Class.define("ae.map.model.source.Vector", {
	extend : qx.core.Object,
	
	properties : {

		/**
		 * Source
		 */
		features : {
			//apply : "_applyCqlfilter",
			event : "changeSource",
			init : null
		}
		
	},

	construct : function(){
		this.base(arguments);
		
	}
});
