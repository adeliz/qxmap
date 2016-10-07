/**
 * Map
 */
qx.Class.define("ae.map.model.Map", {
	extend : qx.core.Object,

	construct : function (){
		this.base(arguments);
		//this.initFilters(new qx.data.Array());
		//this.addListener("")
	},
	
	properties : {
		/**
		 * Name
		 */
		name : {
			check : "String",
			event : "changeName",
			nullable : true,
			init : ""
		},

		/**
		 * View of the map
		 */
        view : {
            check : "ae.map.model.View",
            event : "changeView",
            init : new ae.map.model.View()
        },
		
		/**
		 * Array of layers
		 */
		layers : {
			check : "qx.data.Array",
			//transform : "_transformLayers",
			init : new qx.data.Array()
		}
	},
	
	events : {
		/**
		 * Fired when a layer is added
		 */
	    "addLayer" : "qx.event.type.Data",
	    /**
	     * Fired when a layer is removed
	     */
	    "removeLayer" : "qx.event.type.Data",
	    /**
	     * Fired when layer is raised
	     */
	    "raiseLayer" : "qx.event.type.Data"
	},
	
	members :
	{
		/**
		 * Add a layer
		 * @param layer {map.model.layer.Layer} Layer
		 */
		addLayer : function(layer){
			this.getLayers().insertBefore(this.getLayers().getItem(0),layer);
			this.fireDataEvent("addLayer",layer);
		},
		
		/**
		 * Remove a layer
		 * @param layer {map.model.layer.Layer} Layer
		 */
		removeLayer : function(layer){
			this.getLayers().remove(layer);
			this.fireDataEvent("removeLayer",layer);
		},

		/**
		 * Remove all layers
		 */
        removeAllLayers : function(){
            var k = this.getLayers().length;
            for(var i=0;i<k;i++){
                this.removeLayer(this.getLayers().getItem(k-1-i));
            }
        },

        /**
		 * Change the index of the given layer by delta.
		 * If delta is positive, the layer is moved up.
		 * If delta is negative, the layer is moved down.
		 * @param layer {map.model.layer.Layer} Layer
		 * @param delta {Integer} Delta
		 */
		raiseLayer : function(layer,delta){
			var pos = this.getLayers().indexOf(layer);
			this.getLayers().removeAt(pos);
			this.getLayers().insertAt(pos+delta,layer);
			var e = new Object();
			e.layer = layer;
			e.delta = delta;
			this.fireDataEvent("raiseLayer",e);
		},

		/**
		 * Generate a json string 
		 * @return {String} model's map in json format
		 */
        toString : function(){
            var json = {};
            json.name = this.getName();
            json.xcenter = this.getView().getCenter()[0];
            json.ycenter = this.getView().getCenter()[1];
            json.zoom = this.getZoom();
            json.layers=[];

            return qx.lang.Json.stringify(json);
        }
	}
});
