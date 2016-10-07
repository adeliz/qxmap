/**
 * Map
 */
qx.Class.define("ae.map.model.View", {
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
		 * Center of the map
		 */
        center : {
            //check : "Array",
            event : "changeCenter",
            init : null
        },
		
        /**
         * Zoom level
         */
		zoom : {
			check : "Integer",
			event : "changeZoom",
            init : 0
		}
	},
	
	members :
	{
		
	}
});
