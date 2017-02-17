/**
 * Vector source
 */
qx.Class.define("ae.map.model.source.Vector", {
	extend : qx.core.Object,
	include :  qx.data.marshal.MEventBubbling,
	
	properties : {

		/**
		 * Source
		 */
		features : {
			apply : "_apply",
			event : "changeFeatures",
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
