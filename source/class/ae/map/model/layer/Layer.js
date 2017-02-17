/**
 * Layer
 */
qx.Class.define("ae.map.model.layer.Layer", {
	extend : ae.map.model.layer.Base,
	include :  qx.data.marshal.MEventBubbling,

	properties : {
		
		source : {
			event : "changeSource",
			apply : "_apply",
			init : null
		}
		
	},
	
	construct : function(){
		this.base(arguments);
		
	},
	
	members : {
		_apply : function(value, old, name){
			this._applyEventPropagation(value, old, name);
		}
	}

});
