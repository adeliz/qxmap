/**
 *Static methods
 *
 *@ignore(ol.*)
 */
qx.Class.define("ae.map.Util", {
	
  statics : {

	  fromLonLat : function(coord){
		  return new ol.proj.fromLonLat(coord);
	  }
  }
});