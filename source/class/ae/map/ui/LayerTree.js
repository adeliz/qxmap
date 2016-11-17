/**
 * Layer view (List all the layers available on the map)
 */
qx.Class.define("ae.map.ui.LayerTree",
    {
        extend : qx.ui.container.Composite,


        /**
         * Creates a new instance of Layer view
         * @param model {map.model.Map} Map model
         */
        construct : function()
        {
            this.base(arguments);
            var layout = new qx.ui.layout.VBox;
            this.setLayout(layout);
            layout.setSeparator("separator-vertical");
            this.setDecorator("main");
            this.setWidth(250);


            var tree = this.tree = new qx.ui.tree.Tree().set({
                decorator:null,
                hideRoot : false,
                rootOpenClose: true
            });
            
            
            this.add(tree,{flex:1});
            this.treeController = new qx.data.controller.Tree(null, tree, "layers", "name");
            //this.treeController.setIconPath("icon");
            this.treeController.setDelegate({
            	createItem : function(){
            		return new ae.map.ui.LayerTreeItem()
            	},
            	bindItem : function(controller, item, id){
            		controller.bindDefaultProperties(item, id);
            		/*controller.bindProperty("size", "size", null, item, id);*/
            	    controller.bindProperty("visible", "checked", null, item, id);
            	    controller.bindPropertyReverse("visible", "checked", null, item, id);
            	    /*controller.bindProperty("date", "date", null, item, id);
            	    controller.bindProperty("mode", "mode", null, item, id);
            	    controller.bindProperty("light", "light", null, item, id);*/
            	}
            });
            //model.bind("model",this.treeController,"model");
            
        },

        members :
        {

           
        }
    });
