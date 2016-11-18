/**
 * Layer widget (widget representing a layer in the layer view)
 */
qx.Class.define("ae.map.ui.LayerWidget",
    {
        extend: qx.ui.core.Widget,
        include: [qx.ui.form.MModelProperty],

        /**
         * Create a new instance of layer widget
         */
        construct: function () {
            this.base(arguments);

            // initialize the layout and allow wrap for "post"
            var layout = new qx.ui.layout.Grid(4, 5);
            layout.setColumnFlex(1, 1);
            this._setLayout(layout);

            // create the widgets
            this._createChildControl("icon");
            this._createChildControl("name");
            this._createChildControl("visible2");
            this._createChildControl("opacity2");
        },

        properties: {
            /**
             * The space between the icon and the label
             */
            gap :
            {
                themeable : true
            },

            /**
             * The appearance ID.
             */
            appearance: {
                refine: true,
                init: "listitem"
            },

            /**
             * Any URI String supported by qx.ui.basic.Image to display an icon
             */
            icon: {
                check: "String",
                apply: "_applyIcon",
                nullable: true
            },

            /**
             * Visible name of the layer
             */
            name: {
                check: "String",
                apply: "_applyName",
                nullable: true
            },

            /**
             * Visibility of the layer
             */
            visible2: {
                check: "Boolean",
                apply: "_applyVisible2",
                event : "changeVisible2",
                nullable: true
            },

            /**
             * Opacity of the layer
             */
            opacity2: {
                check: "Number",
                apply: "_applyOpacity2",
                event : "changeOpacity2",
                nullable: true
            }
        },

        members: {
            /**
             * Internal method to create child controls. This method is overwritten support new child control types.
             * @param id {String} ID of the child control. If a # is used, the id is the part infront of the #.
             * @return {qx.ui.core.Widget} The created control or null
             */
            _createChildControlImpl: function (id) {
                var control;

                switch (id) {
                    case "icon":
                        control = new qx.ui.basic.Image(this.getIcon());
                        control.set({
                            marginLeft:5
                        });
                        control.setAnonymous(true);
                        this._add(control, {row: 0, column: 0});
                        break;

                    case "name":
                        control = new qx.ui.basic.Label(this.getName());
                        control.set({
                            marginLeft:5
                        });
                        control.setAnonymous(true);
                        //control.setRich(true);
                        this._add(control, {row: 0, column: 1});
                        break;
                    case "visible2":
                        //control = new qx.ui.form.CheckBox(this.getVisible2());
                        control = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
                            marginRight:10,
                            marginLeft:10
                        });
                        control.setAnonymous(true);
                        var cbox = new qx.ui.form.CheckBox();

                        cbox.addListener("changeValue",function(e){
                            this.setVisible2(e.getData());
                        },this);
                        control.add(cbox);

                        this._add(control, {row: 0, column: 4});

                        break;

                    case "opacity2":
                        control = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
                            marginLeft:10
                        });
                        control.setAnonymous(true);
                        var slider = new qx.ui.form.Slider().set({
                            minimum: 1,
                            maximum: 100,
                            singleStep: 1,
                            value: 1,
                            width:100
                        });

                        control.add(slider);

                        //this._add(control, {row: 0, column: 3});

                        break;

                }

                return control || this.base(arguments, id);
            },

            /**
             * Applies changes of the property value of the property icon.
             * @param value {String} new value of the property
             * @param old {String} previous value of the property (null if it was not yet set).
             */
            _applyIcon: function (value, old) {
                var icon = this.getChildControl("icon");
                icon.setSource(value);
            },

            /**
             * Applies changes of the property value of the property name.
             * @param value {String} new value of the property
             * @param old {String} previous value of the property (null if it was not yet set).
             */
            _applyName : function(value, old)
            {
                var name = this.getChildControl("name");
                //name.setValue("<b>"+value+"</b>");
                name.setValue(value);
            },

            /**
             * Applies changes of the property value of the property visible.
             * @param value {String} new value of the property
             * @param old {String} previous value of the property (null if it was not yet set).
             */
            _applyVisible2: function (value, old) {
                var visible2 = this.getChildControl("visible2");
                visible2.getChildren()[0].setValue(value);

                //var visible2 = this.getChildControl("visible2");
                //visible2.setValue(value);
            },

            /**
             * Applies changes of the property value of the property opacity.
             * @param value {String} new value of the property
             * @param old {String} previous value of the property (null if it was not yet set).
             */
            _applyOpacity2: function (value, old) {
                var opacity2 = this.getChildControl("opacity2");
                opacity2.getChildren()[0].setValue(value);
            }
        }
    });