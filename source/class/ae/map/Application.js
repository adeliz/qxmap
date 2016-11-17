/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "qxmap"
 *
 * @asset(ae/map/*)
 */
qx.Class.define("ae.map.Application",
{
  extend : qx.application.Standalone,

  properties : {
		
	},

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var mapModel = new ae.map.model.Map();
      var view = new ae.map.model.View().set({
    	  center : ol.proj.fromLonLat([5.41, 35.82]),
          zoom: 4
      })
      var layer = new ae.map.model.layer.Tile();
      layer.setSource(new ae.map.model.source.OSM());
      
      var feature = new ae.map.model.Feature().set({
    	  geometry : new ae.map.model.geom.Point().set({
        	  coordinates : ol.proj.fromLonLat([5.41, 25.82])
          })
      });
      
      var feature2 = new ae.map.model.Feature().set({
    	  geometry : new ae.map.model.geom.Point().set({
        	  coordinates : ol.proj.fromLonLat([0.41, 20.82])
          })
      });
      
      var feature3 = new ae.map.model.Feature().set({
    	  geometry : new ae.map.model.geom.LineString().set({
        	  coordinates : [ol.proj.fromLonLat([0.41, 20.82]),ol.proj.fromLonLat([2.41, 14.82]),ol.proj.fromLonLat([5.41, 25.82])]
          })
      });
      //console.log(feature.getGeometry().getCoordinates());
      var features = new qx.data.Array();
      features.push(feature);
      features.push(feature2);
      
      
      var layer2 = new ae.map.model.layer.Vector().set({
    	  source : new ae.map.model.source.Vector().set({
    		  features : features
    	  })
      });
      
      var f = new qx.data.Array();
      f.push(feature3);
      var layer3 = new ae.map.model.layer.Vector().set({
    	  source : new ae.map.model.source.Vector().set({
    		  features : f
    	  })
      });
      
      var layers = new qx.data.Array();
      
      layers.push(layer);
      
      var group = new ae.map.model.layer.Group().set({
    	  name:"TEst",
    	  layers: new qx.data.Array([layer2,layer3])});

      layers.push(group);

      
      mapModel.setLayers(layers);
      mapModel.setView(view);
      var map = new ae.map.ui.Map(mapModel);
      
      var layerTree = new ae.map.ui.LayerTree();
      
      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      var splitpane = new qx.ui.splitpane.Pane();
      splitpane.add(layerTree);
      splitpane.add(map);
      
      doc.add(splitpane, {edge: 50});
      
      var rootLayer = new ae.map.model.layer.Group().set({name:"Root"});
      rootLayer.setLayers(mapModel.getLayers())
      layerTree.treeController.setModel(rootLayer);
      //mapModel.bind("layers[1]",layerTree.treeController,"model");

    }
  }
});
