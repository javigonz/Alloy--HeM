function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openLoading() {
        Ti.App.removeEventListener("openLoading", function() {
            openLoading();
        });
        $.winloading.opacity = 0;
        $.winloading.width = Ti.UI.FILL;
        $.winloading.height = Ti.UI.FILL;
        $.winloading.animate(FadeInMid_Opacity);
        Alloy.Globals.IsLoading = "true";
    }
    function closeLoading() {
        Ti.App.removeEventListener("closeLoading", function() {
            closeLoading();
        });
        $.winloading.animate(FadeOut_Opacity);
        var miniTimer3 = setTimeout(function() {
            clearInterval(miniTimer3);
            $.winloading.width = 0;
            $.winloading.height = 0;
        }, 300);
        Alloy.Globals.IsLoading = "false";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "loading";
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
    $.__views.winloading = Ti.UI.createView({
        backgroundColor: Alloy.CFG.BLACK,
        opacity: .7,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        id: "winloading"
    });
    $.__views.winloading && $.addTopLevelView($.__views.winloading);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: Alloy.CFG.WHITE,
        style: Ti.UI.ActivityIndicatorStyle.BIG,
        opacity: 1,
        id: "activityIndicator"
    });
    $.__views.winloading.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("openLoading", function() {
        openLoading();
    });
    Ti.App.addEventListener("closeLoading", function() {
        closeLoading();
    });
    $.activityIndicator.show();
    Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
        opacity: 1,
        duration: 300
    });
    var FadeOut_Opacity = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
        opacity: 0,
        duration: 300
    });
    var FadeInMid_Opacity = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
        opacity: .7,
        duration: 300
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;