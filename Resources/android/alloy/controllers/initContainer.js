function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function show() {
        Alloy.Globals.WinInitContainer = $.winInitContainer;
        $.viewInitContainer.height = Alloy.CFG.HeightDevice - 45 - 80 - 20;
        $.viewInitContainer.top = 45;
        Alloy.Globals.WinInitContainer.addEventListener("android:back", function() {
            Ti.API.info("Botón Back dispositivo Android");
            managment_View.closeActualSection();
        });
        Alloy.Globals.viewContainerPrincipal = $.viewInitContainer;
        $.winInitContainer.open();
        managment_View.OpenSectionParam("home", [], "home", $.viewInitContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "initContainer";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.winInitContainer = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.WHITE,
        navBarHidden: "true",
        tabBarHidden: "true",
        exitOnClose: "true",
        id: "winInitContainer"
    });
    $.__views.winInitContainer && $.addTopLevelView($.__views.winInitContainer);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "__alloyId4"
    });
    $.__views.winInitContainer.add($.__views.__alloyId4);
    $.__views.viewInitContainer = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        id: "viewInitContainer"
    });
    $.__views.winInitContainer.add($.__views.viewInitContainer);
    $.__views.header = Alloy.createController("header", {
        id: "header",
        __parentSymbol: $.__views.winInitContainer
    });
    $.__views.header.setParent($.__views.winInitContainer);
    $.__views.footer = Alloy.createController("footer", {
        id: "footer",
        __parentSymbol: $.__views.winInitContainer
    });
    $.__views.footer.setParent($.__views.winInitContainer);
    $.__views.loading = Alloy.createController("loading", {
        id: "loading",
        __parentSymbol: $.__views.winInitContainer
    });
    $.__views.loading.setParent($.__views.winInitContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("utils");
    var managment_View = require("managment_View");
    arguments[0] || {};
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;