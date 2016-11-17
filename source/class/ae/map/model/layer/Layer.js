/**
 * Layer
 */
qx.Class.define("ae.map.model.layer.Layer", {
	extend : ae.map.model.layer.Base,

	properties : {
		
		source : {
			event : "changeSource",
			init : null
		}
		
	},
	
	construct : function(){
		this.base(arguments);
		
	}

});
