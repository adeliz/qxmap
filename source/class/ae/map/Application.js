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
      features.push(feature3);
      
      var layer2 = new ae.map.model.layer.Vector().set({
    	  source : new ae.map.model.source.Vector().set({
    		  features : features
    	  })
      });
      
      var layers = new qx.data.Array();
      
      layers.push(layer);
      layers.push(layer2);
      
      mapModel.setLayers(layers);
      mapModel.setView(view);
      var map = new ae.map.ui.Map(mapModel);
      

      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(map, {edge: 50});

    }
  }
});
