function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function handlerBack() {
        Ti.API.info("Botón Back");
        managment_View.closeActualSection();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "header";
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
    var __defers = {};
    $.__views.header = Ti.UI.createView({
        backgroundColor: Alloy.CFG.BLUE2,
        height: 50,
        width: Ti.UI.FILL,
        top: 20,
        id: "header"
    });
    $.__views.header && $.addTopLevelView($.__views.header);
    $.__views.LogoHeader = Ti.UI.createView({
        left: 0,
        top: 0,
        width: 175,
        id: "LogoHeader"
    });
    $.__views.header.add($.__views.LogoHeader);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        left: 0,
        top: 0,
        image: "/images/logo.png",
        id: "__alloyId0"
    });
    $.__views.LogoHeader.add($.__views.__alloyId0);
    $.__views.buttonBack = Ti.UI.createView({
        top: 0,
        right: 0,
        width: 45,
        id: "buttonBack"
    });
    $.__views.header.add($.__views.buttonBack);
    handlerBack ? $.__views.buttonBack.addEventListener("click", handlerBack) : __defers["$.__views.buttonBack!click!handlerBack"] = true;
    $.__views.__alloyId1 = Ti.UI.createView({
        width: 1,
        height: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        left: 0,
        top: 0,
        id: "__alloyId1"
    });
    $.__views.buttonBack.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        right: 10,
        width: 24,
        height: 28,
        image: "/images/backButton.png",
        id: "__alloyId2"
    });
    $.__views.buttonBack.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    __defers["$.__views.buttonBack!click!handlerBack"] && $.__views.buttonBack.addEventListener("click", handlerBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;