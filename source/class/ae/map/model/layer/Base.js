/**
 * Base layer
 */
qx.Class.define("ae.map.model.layer.Base", {
	extend : qx.core.Object,
	include :  qx.data.marshal.MEventBubbling,

	properties : {

		name : {
			check : "String",
			event : "changeName",
			apply : "_apply",
			init : ""
		},
		
		opacity : {
			event : "changeOpacity",
			apply : "_apply"
		},
		
		visible : {
			event : "changeVisible",
			apply : "_apply",
			init:true
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
