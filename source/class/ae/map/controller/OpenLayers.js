/**
 * Controller links map's model and openlayers map
 */

qx.Class.define("ae.map.controller.OpenLayers",
{
	extend : qx.core.Object,
	
	properties : {
		/**
		 * Model of the map
		 */
		model : {
			check : "ae.map.model.Map",
			apply : "_applyModel",
			nullable : true,
			init : null
		},
		/**
		 * Openlayers map
		 */
		olmap :{
			check : "ol.Map",
			nullable : true,
			init : null
		}
	},
	
	/**
	 * Creates an instance of the openlayers controller
	 * 
	 * @param model {ae.map.model.Map} map's model
	 * @param olmap {object} openlayers map
	 * 
	 */
	construct : function(model, olmap){

		this.setOlmap(olmap);
		this.setModel(model);
		
	},
	
	members : {
		_applyModel : function(value){
			this._initModel(value);
		},
		
		/**
		 * Init the model
		 * @param model {map.model.Map} map's model
		 */
		_initModel : function(model){
			if(!model){
				return;
			}

			console.log(model.getView().getCenter());
			//Init the map with data in the model

			this.getOlmap().getView().setZoom(model.getView().getZoom());
			this.getOlmap().getView().setCenter(model.getView().getCenter());
			
			for(var i=0; i<model.getLayers().length;i++){
				var tiled = new ol.layer.Tile({source:model.getLayers().getItem(i)});
				this.getOlmap().getLayers().push(tiled);
			}

		}
	}
});