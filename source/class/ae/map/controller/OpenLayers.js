/**
 * Controller links map's model and openlayers map
 * 
 * @ignore(ol.*)
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

			var olMap = this.getOlmap();
			
			//Init the map with data in the model
			
			olMap.getView().setZoom(model.getView().getZoom());
			olMap.getView().setCenter(model.getView().getCenter());
			
			model.addListener("changeBubble", function(e){

				var name = e.getData().name;
				var value = e.getData().value;
				var item = e.getData().item;
				var old = e.getData().old;
				
				olMap.getLayers()[1].setVisible(false);
				console.log(name);
				
			});
			
			var walk = function(layers,parent){
				for(var i=0; i<layers.length;i++){
					var layer = layers.getItem(i);
					var olLayer;
					switch(layer.classname){
						case "ae.map.model.layer.Group" :
							var olGroup = new ol.layer.Group({
								name:layer.getName()
							});
							parent.getLayers().push(olGroup);
							walk(layer.getLayers(),olGroup);
							break;
						case "ae.map.model.layer.Tile" :
							var olSource;
							switch(layer.getSource().classname){
								case "ae.map.model.source.OSM" :
									olSource = new ol.source.OSM();
									break;
								case "ae.map.model.source.BingMaps" :
									olSource = new ol.source.BingMaps(layer.getSource()._options);
									break;
								case "ae.map.model.source.XYZ" :
									olSource = new ol.source.XYZ(layer.getSource()._options);
									break;
								case "ae.map.model.source.TileWMS" :
									break;
							}
							var olLayer = new ol.layer.Tile({source:olSource});
							parent.getLayers().push(olLayer);
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
									case "ae.map.model.geom.LineString" :
										olGeometry = new ol.geom.LineString(geometry.getCoordinates());
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
							parent.getLayers().push(olLayer);
							break;
					}
					
					
				}
			};
			
			walk(model.getLayers(),this.getOlmap());

		}
	}
});