/**
 * Map widget
 * 
 * @ignore(openlayers.*)
 * @asset(openlayers/*)
 * @asset(ol3/*)
 */
qx.Class.define("ae.map.ui.Map", {
	extend : qx.ui.core.Widget,
	include: [ae.map.MScriptLoader],
	
	properties : {
		/**
		 * Map's model
		 */
		model : {
			check : "ae.map.model.Map",
			nullable : true,
			init : null
		}
	},
	/**
	 * @param model {map.model.Map} Map's model
	 */
	construct : function(model) {
		this.base(arguments);

		this.setModel(model);
		//this.addListener('scriptsReady', function(){
			/*if(this.getPlotlyDiv()){
				new map.controller.OpenLayers(model,olmap);
			}else{*/
				this.addListenerOnce("appear", function(e){
					qx.bom.Stylesheet.includeFile('resource/ol3/ol.css');
					var olmap = this.olmap = new ol.Map({
						target : this.getContentElement().getDomElement(),
						//to customize later if needed...
						interactions : 
							[
							 new ol.interaction.DragPan(),
							 new ol.interaction.DragZoom(),
							 new ol.interaction.MouseWheelZoom(),
							  
						],
						controls : 
							[
							 new ol.control.Zoom(), 
							 new ol.control.ScaleLine() 
							 ]
					});
					
					var controller = new ae.map.controller.OpenLayers(this.getModel(),olmap);

				},this);
			//}
		//}, this);
		
		

		/*this._loadScriptsDynamic([
			"openlayers/ol.js"
		]);*/
		
        this.addListener("resize", function (e) {
        	if(this.getOlMap()){
        		this.getOlMap().updateSize();
        	}
            
        },this);
	},

	members : {
			/**
		 * Get Openlayers map
		 * @return {Openlayers.Map} Openlayers map
		 */
		getOlMap : function(){
			return this.olmap;
		}
	}
});
