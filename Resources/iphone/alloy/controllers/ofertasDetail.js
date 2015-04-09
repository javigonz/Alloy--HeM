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
        Alloy.Globals.ActualContainer = $.viewOfertasDetail;
        Ti.App.addEventListener("loadOfertasDetail", loadOfertasDetail);
        managment_Data.LoadWebService_Ofertas_Detail(args[0][0]);
    }
    function loadOfertasDetail() {
        Ti.App.removeEventListener("loadOfertasDetail", loadOfertasDetail);
        if ("ok" == datamodel_Ofertas_Detail.code) {
            var style_viewImage = $.createStyle({
                classes: [ "style_viewImage" ]
            });
            var productImage = $.createStyle({
                classes: [ "productImage" ]
            });
            var style_viewName = $.createStyle({
                classes: [ "style_viewName" ]
            });
            var textName = $.createStyle({
                classes: [ "textName" ]
            });
            {
                $.createStyle({
                    classes: [ "textDate" ]
                });
            }
            {
                $.createStyle({
                    classes: [ "style_viewGps" ]
                });
            }
            var style_iconoGps = $.createStyle({
                classes: [ "style_iconoGps" ]
            });
            {
                $.createStyle({
                    classes: [ "textGps" ]
                });
            }
            var textDescription = $.createStyle({
                classes: [ "textDescription" ]
            });
            var viewImage = Ti.UI.createView({});
            viewImage.applyProperties(style_viewImage);
            if ("iphone" == Ti.Platform.osname) {
                var imageRemote1 = remoteView.createRemoteImageView({
                    image: Alloy.Globals.UrlImages + datamodel_Ofertas_Detail.result.imagen2,
                    defaultImage: "/images/download.png"
                });
                imageRemote1.applyProperties(productImage);
            } else {
                var imageRemote1 = Titanium.UI.createImageView({
                    image: Alloy.Globals.UrlImages + datamodel_Ofertas_Detail.result.imagen2,
                    defaultImage: "/images/download.png"
                });
                imageRemote1.applyProperties(productImage);
            }
            var viewName = Ti.UI.createView({});
            viewName.applyProperties(style_viewName);
            var iconoGps = Ti.UI.createImageView({
                image: "/images/iconoClock.png"
            });
            iconoGps.applyProperties(style_iconoGps);
            var label1 = Ti.UI.createLabel({
                text: datamodel_Ofertas_Detail.result.nombre
            });
            label1.applyProperties(textName);
            var webviewDescription = Ti.UI.createWebView({
                enableZoomControls: "false"
            });
            webviewDescription.applyProperties(textDescription);
            webviewDescription.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/><html style="font-size:13px">' + datamodel_Ofertas_Detail.result.descripcion + "</html>";
            viewImage.add(imageRemote1);
            viewName.add(iconoGps);
            viewName.add(label1);
            $.containerOfertasDetail.add(viewImage);
            $.containerOfertasDetail.add(viewName);
            $.containerOfertasDetail.add(webviewDescription);
        } else managment_View.OpenInfoWindow(L("text_6"));
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ofertasDetail";
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
    $.__views.viewOfertasDetail = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewOfertasDetail"
    });
    $.__views.viewOfertasDetail && $.addTopLevelView($.__views.viewOfertasDetail);
    $.__views.containerScroll = Ti.UI.createScrollView({
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.SIZE,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        width: Ti.UI.FILL,
        verticalBounce: "false",
        top: 0,
        backgroundColor: Alloy.CFG.WHITE,
        showPagingControl: "false",
        id: "containerScroll"
    });
    $.__views.viewOfertasDetail.add($.__views.containerScroll);
    $.__views.containerOfertasDetail = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        layout: "vertical",
        id: "containerOfertasDetail"
    });
    $.__views.containerScroll.add($.__views.containerOfertasDetail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    var remoteView = require("createRemoteImageView");
    var args = arguments[0] || {};
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;