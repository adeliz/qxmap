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

				//console.log(e.getData());
				var name = e.getData().name;
				var value = e.getData().value;
				var item = e.getData().item;
				var old = e.getData().old;
				
				if(value == old){
					return;
				}
				
				var obj={};
				
				
				if(name.startsWith("layer")){
					
					var properties = this.__getPropertyChainArray(name);
					var index = properties.length - 1;
					var target = this.getOlmap();
					for (var i = 0; target !== null && i < index; i++) {
						var parentTarget = target;
				        try {
				          var property = properties[i];

				          // array notation
				          var arrIndex = this.__getArrayIndex(property);
				          
				          if (arrIndex) {
				            target = target.item(arrIndex);//.getItem(arrIndex);
				          }
				          else {
				            target = target["get" + qx.lang.String.firstUp(property)]();
				          }
				        } catch (ex) {
				          return null;
				        }
				      }

					var lastProperty = properties[properties.length - 1];
			        // check for array notation
			        var index = this.__getArrayIndex(lastProperty);
			        if (index) {
			        	//Check if it's push action
			        	if(old.length==0){
			        		//console.log(value);
			        		//console.log(parentTarget);
			        		this.walk(new qx.data.Array(value),parentTarget);
			        	}
			        	//Check if it's remove action
			        	if(value.length==0){
			        		//console.log(parentTarget);
			        		//console.log(index);
			        		parentTarget.getLayers().removeAt(index);
			        	}
			          //target.setAt(index, value);
			        } else {
			          target["set" + qx.lang.String.firstUp(lastProperty)](value);
			        }
				}
			},this);
			
			var walk = this.walk = function(layers,parent){
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

			/*model.addListener("addLayer", function(e){
				var layers = new qx.data.Array([e.getData()]);
				walk(layers,this);
			},this.getOlmap());*/
		},
		
		/**
	     * Converts a property chain string into a list of properties and/or
	     * array indexes
	     * @param targetPropertyChain {String} property chain
	     * @return {String[]} Array of property names
	     */
	    __getPropertyChainArray: function(targetPropertyChain) {
	      // split properties (dot notation) and array indexes (bracket notation)
	      return targetPropertyChain.replace(/\[/g, ".[").split(".")
	        .filter(function(prop) {
	          return prop !== "";
	        });
	    },
	    
	    /**
	     * Returns the index from a property using bracket notation, e.g.
	     * "[42]" returns "42", "[last]" returns "last"
	     *
	     * @param propertyName {String} A property name
	     * @return {String|null} Array index or null if the property name does
	     * not use bracket notation
	     */
	    __getArrayIndex: function(propertyName) {
	      var arrayExp = /^\[(\d+|last)\]$/;
	        var arrayMatch = propertyName.match(arrayExp);
	        if (arrayMatch) {
	          return  arrayMatch[1];
	        }
	        return null;
	    }
	}
});