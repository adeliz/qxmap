/**
 * Group layer
 */
qx.Class.define("ae.map.model.layer.Group", {
	extend : ae.map.model.layer.Base,
	include :  qx.data.marshal.MEventBubbling,

	properties : {
		
		/**
		 * Layers
		 */
		layers : {
			check : "qx.data.Array",
			event : "changeLayers",
			apply : "_apply",
			deferredInit : true
		}
		
	},
	
	construct : function(){
		this.base(arguments);
		this.initLayers(new qx.data.Array());
	},

	
	members :
	{
		_apply : function(value, old, name){
			this._applyEventPropagation(value, old, name);
		}
	}

});
