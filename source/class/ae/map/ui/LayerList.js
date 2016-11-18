/**
 * Layer view (List all the layers available on the map)
 */
qx.Class.define("ae.map.ui.LayerList",
    {
        extend : qx.ui.container.Composite,


        /**
         * Creates a new instance of Layer view
         * @param model {map.model.Map} Map model
         */
        construct : function(model)
        {
            this.base(arguments);
            var layout = new qx.ui.layout.VBox;
            this.setLayout(layout);
            layout.setSeparator("separator-vertical");
            this.setDecorator("main");
            this.setWidth(250);


            this.model = model;
            var caption = new qx.ui.basic.Label(this.tr("Layers")).set({
                font       : "bold",
                padding    : 5,
                allowGrowX : true,
                allowGrowY : true
            });
            this.add(caption);
            this.add(this.__createList(), {flex:1});
        },

        members :
        {

            /**
             * Create the layers list
             * @return {qx.ui.list.List} List
             */
            __createList : function(){
                var list = this.list =  new qx.ui.form.List().set({
                    decorator:null
                });
                list.setDraggable(true);
                list.setDroppable(true);

                /*var controller = this.controller = new qx.data.controller.List(this.model.getLayers(), this.list,"name");
                controller.setIconPath("geometryType");
                controller.setIconOptions({converter : function(data) {
                    switch (data) {
                        case "Point":
                            return "map/icons/points.png";

                        case "Path":
                            return "map/icons/line.png";

                        case "Polygon":
                            return "map/icons/polygon.png";

                        case "Mix":
                            return "map/icons/mix.png";

                        default:
                            return "map/icons/raster.png";;
                    }
                }});*/

                var controller = this.controller = new qx.data.controller.List(null, this.list,"name");
                /*controller.setIconPath("geometryType");
                controller.setIconOptions({converter : function(data) {
                    switch (data) {
                        case "Point":
                            return "map/icons/points.png";

                        case "Path":
                            return "map/icons/line.png";

                        case "Polygon":
                            return "map/icons/polygon.png";

                        case "Mix":
                            return "map/icons/mix.png";

                        default:
                            return "map/icons/raster.png";
                    }
                }});  */

                controller.setDelegate({
                    createItem : function() {
                        return new ae.map.ui.LayerWidget();
                    },

                    bindItem : function(controller, item, id) {
                        controller.bindProperty("", "model", null, item, id);
                        //controller.bindPropertyReverse("", "model", null, item, id);
                        controller.bindProperty("name", "name", null, item, id);
                        //controller.bindPropertyReverse("name", "name", null, item, id);
                        controller.bindProperty("visible", "visible2", null, item, id);
                        controller.bindPropertyReverse("visible", "visible2", null, item, id);
                        //controller.bindPropertyReverse("visibility", "visible", null, item, id);
                        /*controller.bindProperty("opacity", "opacity2", {converter: function(value) {
                            if(typeof value == 'undefined'){
                                value=1;
                            }
                            return value*100;
                        }}, item, id);
                        controller.bindProperty("geometryType", "icon", {
                            converter: function(data) {
                                switch (data) {
                                    case "Point":
                                        return "map/icons/points.png";

                                    case "Path":
                                        return "map/icons/line.png";

                                    case "Polygon":
                                        return "map/icons/polygon.png";

                                    case "Geometry":
                                        return "map/icons/mix.png";
                                        
                                    case "Mix":
                                        return "map/icons/mix.png";

                                    default:
                                        return "map/icons/raster.png";;
                                }
                            }
                        }, item, id);*/
                    },

                    configureItem : function(item) {
                        //item.getChildControl("icon").setWidth(48);
                        //item.getChildControl("icon").setHeight(48);
                        //item.getChildControl("icon").setScale(true);
                        //item.setMinHeight(52);
                        //item.setAppearance("my.Appearance");
                    }
                });


                //Reorderable
                var indicator = new qx.ui.core.Widget();
                indicator.setDecorator(new qx.ui.decoration.Decorator().set({
                    widthTop: 1,
                    styleTop: "solid",
                    colorTop: "black"
                }));
                indicator.setHeight(0);
                indicator.setOpacity(0.5);
                indicator.setZIndex(100);
                indicator.setLayoutProperties({left: -1000, top: -1000});
                indicator.setDroppable(true);
                qx.core.Init.getApplication().getRoot().add(indicator);

                // Just add a move action
                list.addListener("dragstart", function(e) {
                    e.addAction("move");
                });

                list.addListener("dragend", function(e)
                {
                    // Move indicator away
                    indicator.setDomPosition(-1000, -1000);
                });

                list.addListener("drag", function(e)
                {
                    var orig = e.getOriginalTarget();

                    // store the current listitem - if the user drops on the indicator
                    // we can use this item instead of calculating the position of the
                    // indicator
                    if (orig instanceof qx.ui.form.ListItem) {
                        qx.core.Init.getApplication().__currentListItem = orig;
                    }

                    if (!qx.ui.core.Widget.contains(this, orig) && orig != indicator) {
                        return;
                    }

                    var origCoords = orig.getContentLocation();

                    indicator.setWidth(orig.getBounds().width);
                    indicator.setDomPosition(origCoords.left, origCoords.top);
                });

                list.addListener("dragover", function(e)
                {
                    // Stop when the dragging comes from outside
                    if (e.getRelatedTarget()) {
                        e.preventDefault();
                    }
                });

                list.addListener("drop", function(e) {
                    this.__reorderList(e.getOriginalTarget());
                }, this);

                indicator.addListener("drop", function(e) {
                    //this.__reorderList(qx.core.Init.getApplication().__currentListItem);
                }, this);

                //Listener

                return list;
            },

            /**
             * Reorder layers list when drag and drop
             * @param listItem {map.view.LayerWidget} The dragged and dropped layer
             */
            __reorderList : function(listItem){
                // Only continue if the target is a list item.
                /*if (listItem.classname != "qx.ui.form.ListItem") {
                    return ;
                }*/
                if (listItem.classname != "map.view.LayerWidget") {
                    return ;
                }

                var sel = this.list.getSortedSelection();

                var newIndex = this.model.getLayers().indexOf(listItem.getModel());
                var oldIndex = this.model.getLayers().indexOf(sel[0].getModel());

                var delta=0;
                if(newIndex<oldIndex){
                    delta = newIndex-oldIndex;
                } else{
                    delta = newIndex-oldIndex-1;
                }
                var item = sel[0].getModel();
                qx.core.Init.getApplication().getModelMap().raiseLayer(item,delta);
                var selected = new qx.data.Array();
                selected.push(item);
                this.controller.setSelection(selected);
            }
        }
    });
