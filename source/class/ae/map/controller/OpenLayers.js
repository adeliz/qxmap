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

			//Init the map with data in the model

			this.getOlmap().getView().setZoom(model.getView().getZoom());
			this.getOlmap().getView().setCenter(model.getView().getCenter());
			
			for(var i=0; i<model.getLayers().length;i++){
				var layer = model.getLayers().getItem(i);
				var olLayer;
				switch(layer.classname){
					case "ae.map.model.layer.Tile" :
						var olSource;
						switch(layer.getSource().classname){
							case "ae.map.model.source.OSM" :
								olSource = new ol.source.OSM();
								break;
							case "ae.map.model.source.TileWMS" :
								break;
						}
						var olLayer = new ol.layer.Tile({source:olSource});
						break;
					case "ae.map.model.layer.Vector" :
						
						var olFeatures = [];
						for(var j=0;j<layer.getSource().getFeatures().length;j++){
							var feature = layer.getSource().getFeatures().getItem(j);
							var geometry = feature.getGeometry();
							var olGeometry;
							switch(geometry.classname){
								case "ae.map.model.geom.Point" :
									olGeometry = new ol.geom.Point(geometry.getCoordinates());
									break;
							}
							
							var olFeature = new ol.Feature({
								geometry : olGeometry
							});

							olFeatures.push(olFeature);
						}
						var olSource = new ol.source.Vector({
							features : olFeatures
						});

						olLayer = new ol.layer.Vector({source:olSource});
						break;
				}
				
				this.getOlmap().getLayers().push(olLayer);
			}

		}
	}
});