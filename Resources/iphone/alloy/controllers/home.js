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
        Alloy.Globals.ActualContainer = $.viewHome;
        require("managment_Push");
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
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
    $.__views.viewHome = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewHome"
    });
    $.__views.viewHome && $.addTopLevelView($.__views.viewHome);
    $.__views.containerHome = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.CFG.WHITE,
        id: "containerHome"
    });
    $.__views.viewHome.add($.__views.containerHome);
    $.__views.scrollableHomeSlider = Ti.UI.createScrollView({
        contentWidth: Ti.UI.FILL,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        backgroundColor: Alloy.CFG.WHITE,
        layout: "vertical",
        showPagingControl: "false",
        id: "scrollableHomeSlider"
    });
    $.__views.containerHome.add($.__views.scrollableHomeSlider);
    $.__views.__alloyId3 = Ti.UI.createImageView({
        top: 40,
        image: "/images/portada.png",
        id: "__alloyId3"
    });
    $.__views.scrollableHomeSlider.add($.__views.__alloyId3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;