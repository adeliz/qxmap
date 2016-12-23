/**
 * Vector layer
 */
qx.Class.define("ae.map.model.layer.Vector", {
	extend : ae.map.model.layer.Layer,

	properties : {
		style : {
			init:null
		}
	},

	
	construct : function(){
		this.base(arguments);
		
	}

});
