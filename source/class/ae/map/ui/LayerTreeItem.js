qx.Class.define("ae.map.ui.LayerTreeItem",
{
  extend : qx.ui.tree.TreeFolder,

  construct : function() {
    this.base(arguments);

    // fist item: light bulb image
    var img = new qx.ui.basic.Image();
    img.setWidth(16);
    this.addWidget(img);

    // Here's our indentation and tree-lines
    this.addSpacer();
    this.addOpenButton();

    // The standard tree icon follows
    this.addIcon();
    this.setIcon("icon/16/places/user-desktop.png");

    // A checkbox comes right after the tree icon
    var checkbox = new qx.ui.form.CheckBox();
    checkbox.setFocusable(false);
    this.addWidget(checkbox);

    // The label
    this.addLabel("");

    // Anything else should be right justified
    this.addWidget(new qx.ui.core.Spacer(), {flex: 1});

    // Add a file size label
    var size = new qx.ui.basic.Label();
    size.setWidth(50);
    this.addWidget(size);

    // Add a modification date label
    var date = new qx.ui.basic.Label();
    date.setWidth(150);
    this.addWidget(date);

    // Add a mode label
    var mode = new qx.ui.basic.Label();
    mode.setWidth(80);
    this.addWidget(mode);

    // set up the connection between the treefolders properties and the
    // properties of the children
    /*this.bind("light", img, "source", {
      converter : function(data) {
        return data ? "icon/16/status/dialog-information.png" : "";
      }
    });*/
    this.bind("checked", checkbox, "value");
    checkbox.bind("value", this, "checked");
    /*this.bind("size", size, "value");
    this.bind("date", date, "value");
    this.bind("mode", mode, "value");*/
  },


  properties : {
    size : {
      event: "changeSize",
      nullable: true
    },

    checked : {
      event: "changeChecked",
      nullable: true
    },

    date : {
      event: "changeDate",
      nullable: true
    },

    mode : {
      event: "changeMode",
      nullable: true
    },

    light : {
      event: "changeLight",
      nullable: true
    }
  }
});