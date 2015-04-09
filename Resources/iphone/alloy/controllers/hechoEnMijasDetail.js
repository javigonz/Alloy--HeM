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
        Alloy.Globals.ActualContainer = $.viewHechoenmijasDetail;
        Ti.App.addEventListener("loadHechoEnMijasDetail", loadHechoEnMijasDetail);
        managment_Data.LoadWebService_HechoEnMijas_Detail(args[0][0]);
    }
    function loadHechoEnMijasDetail() {
        Ti.App.removeEventListener("loadHechoEnMijasDetail", loadHechoEnMijasDetail);
        if ("ok" == datamodel_HechoEnMijas_Detail.code) {
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
            var textDate = $.createStyle({
                classes: [ "textDate" ]
            });
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
                    image: Alloy.Globals.UrlImages + datamodel_HechoEnMijas_Detail.result[0].imagen2,
                    defaultImage: "/images/download.png"
                });
                imageRemote1.applyProperties(productImage);
            } else {
                var imageRemote1 = Titanium.UI.createImageView({
                    image: Alloy.Globals.UrlImages + datamodel_HechoEnMijas_Detail.result[0].imagen2,
                    defaultImage: "/images/download.png"
                });
                imageRemote1.applyProperties(productImage);
            }
            var viewName = Ti.UI.createView({});
            viewName.applyProperties(style_viewName);
            var iconoGps = Ti.UI.createImageView({
                image: "/images/iconoGps.png"
            });
            iconoGps.applyProperties(style_iconoGps);
            var label1 = Ti.UI.createLabel({
                text: datamodel_HechoEnMijas_Detail.result[0].nombre
            });
            label1.applyProperties(textName);
            var label2 = Ti.UI.createLabel({
                text: datamodel_HechoEnMijas_Detail.result[0].fecha_noticia
            });
            label2.applyProperties(textDate);
            var webviewDescription = Ti.UI.createWebView({
                enableZoomControls: "false"
            });
            webviewDescription.applyProperties(textDescription);
            webviewDescription.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/><html style="font-size:13px">' + datamodel_HechoEnMijas_Detail.result[0].descripcion + "</html>";
            viewImage.add(imageRemote1);
            viewName.add(iconoGps);
            viewName.add(label1);
            viewName.add(label2);
            $.containerHechoenmijasDetail.add(viewImage);
            $.containerHechoenmijasDetail.add(viewName);
            $.containerHechoenmijasDetail.add(webviewDescription);
        } else {
            managment_View.OpenInfoWindow(L("text_6"));
            Ti.API.info("error desde el JS");
        }
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hechoEnMijasDetail";
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
    $.__views.viewHechoenmijasDetail = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewHechoenmijasDetail"
    });
    $.__views.viewHechoenmijasDetail && $.addTopLevelView($.__views.viewHechoenmijasDetail);
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
    $.__views.viewHechoenmijasDetail.add($.__views.containerScroll);
    $.__views.containerHechoenmijasDetail = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        layout: "vertical",
        id: "containerHechoenmijasDetail"
    });
    $.__views.containerScroll.add($.__views.containerHechoenmijasDetail);
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