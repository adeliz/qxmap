/**
 * Group layer
 */
qx.Class.define("ae.map.model.layer.Group", {
	extend : ae.map.model.layer.Base,

	properties : {
		
		/**
		 * Layers
		 */
		layers : {
			check : "qx.data.Array",
			event : "changeLayers",
			apply : "_apply",
			init : null
		}
		
	},
	
	construct : function(){
		this.base(arguments);
		
	}

});
