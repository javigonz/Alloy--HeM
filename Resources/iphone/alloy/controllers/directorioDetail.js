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
        Alloy.Globals.ActualContainer = $.viewDirectorioDetail;
        Ti.App.addEventListener("loadEmpresaDetail", loadEmpresaDetail);
        managment_Data.LoadWebService_Empresa_Detail(args[0][0]);
    }
    function loadEmpresaDetail() {
        Ti.App.removeEventListener("loadEmpresaDetail", loadEmpresaDetail);
        if ("ok" == datamodel_Empresa_Detail.code) {
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
            var style_viewGps = $.createStyle({
                classes: [ "style_viewGps" ]
            });
            var style_iconoGps = $.createStyle({
                classes: [ "style_iconoGps" ]
            });
            var textGps = $.createStyle({
                classes: [ "textGps" ]
            });
            var textDescription = $.createStyle({
                classes: [ "textDescription" ]
            });
            var viewImage = Ti.UI.createView({});
            viewImage.applyProperties(style_viewImage);
            if ("iphone" == Ti.Platform.osname) {
                var imageRemote1 = remoteView.createRemoteImageView({
                    image: Alloy.Globals.UrlImages + datamodel_Empresa_Detail.result.imagen2,
                    defaultImage: "/images/download.png"
                });
                imageRemote1.applyProperties(productImage);
            } else {
                var imageRemote1 = Titanium.UI.createImageView({
                    image: Alloy.Globals.UrlImages + datamodel_Empresa_Detail.result.imagen2,
                    defaultImage: "/images/download.png"
                });
                imageRemote1.applyProperties(productImage);
            }
            var viewName = Ti.UI.createView({});
            viewName.applyProperties(style_viewName);
            var label1 = Ti.UI.createLabel({
                text: datamodel_Empresa_Detail.result.nombre
            });
            label1.applyProperties(textName);
            var label2 = Ti.UI.createLabel({
                text: datamodel_Empresa_Detail.result.direccion
            });
            label2.applyProperties(textDate);
            var viewGps = Ti.UI.createView({
                latitud: datamodel_Empresa_Detail.result.latitud,
                longitud: datamodel_Empresa_Detail.result.longitud,
                nombre: datamodel_Empresa_Detail.result.nombre,
                direccion: datamodel_Empresa_Detail.result.direccion
            });
            viewGps.applyProperties(style_viewGps);
            viewGps.addEventListener("click", handler_detailMap);
            var iconoGps = Ti.UI.createImageView({
                image: "/images/iconoGps.png",
                latitud: datamodel_Empresa_Detail.result.latitud,
                longitud: datamodel_Empresa_Detail.result.longitud,
                nombre: datamodel_Empresa_Detail.result.nombre,
                direccion: datamodel_Empresa_Detail.result.direccion
            });
            iconoGps.applyProperties(style_iconoGps);
            var label3 = Ti.UI.createLabel({
                text: L("text_14"),
                latitud: datamodel_Empresa_Detail.result.latitud,
                longitud: datamodel_Empresa_Detail.result.longitud,
                nombre: datamodel_Empresa_Detail.result.nombre,
                direccion: datamodel_Empresa_Detail.result.direccion
            });
            label3.applyProperties(textGps);
            var webviewDescription = Ti.UI.createWebView({
                enableZoomControls: "false"
            });
            webviewDescription.applyProperties(textDescription);
            webviewDescription.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/><html style="font-size:13px">' + datamodel_Empresa_Detail.result.descripcion + "</html>";
            viewImage.add(imageRemote1);
            viewName.add(label1);
            viewName.add(label2);
            viewGps.add(iconoGps);
            viewGps.add(label3);
            viewName.add(viewGps);
            $.containerDirectorioDetail.add(viewImage);
            $.containerDirectorioDetail.add(viewName);
            $.containerDirectorioDetail.add(webviewDescription);
        } else managment_View.OpenInfoWindow(L("text_6"));
        Ti.App.fireEvent("closeLoading");
    }
    function handler_detailMap(e) {
        e.source.removeEventListener("click", handler_detailMap);
        managment_View.OpenSectionParam("directorioDetailMap", [ e.source ], "", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "directorioDetail";
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
    $.__views.viewDirectorioDetail = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewDirectorioDetail"
    });
    $.__views.viewDirectorioDetail && $.addTopLevelView($.__views.viewDirectorioDetail);
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
    $.__views.viewDirectorioDetail.add($.__views.containerScroll);
    $.__views.containerDirectorioDetail = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        layout: "vertical",
        id: "containerDirectorioDetail"
    });
    $.__views.containerScroll.add($.__views.containerDirectorioDetail);
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