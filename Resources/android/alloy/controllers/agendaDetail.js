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
        Alloy.Globals.ActualContainer = $.viewAgendaDetail;
        Ti.App.addEventListener("loadAgendaDetail", loadAgendaDetail);
        managment_Data.LoadWebService_Agenda_Detail(args[0][0]);
    }
    function loadAgendaDetail() {
        Ti.App.removeEventListener("loadAgendaDetail", loadAgendaDetail);
        if ("ok" == datamodel_Agenda_Detail.code) {
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
            var imageRemote1;
            var imageRemote1 = Titanium.UI.createImageView({
                image: Alloy.Globals.UrlImages + datamodel_Agenda_Detail.result[0].imagen2,
                defaultImage: "/images/download.png"
            });
            imageRemote1.applyProperties(productImage);
            var viewName = Ti.UI.createView({});
            viewName.applyProperties(style_viewName);
            var iconoGps = Ti.UI.createImageView({
                image: "/images/iconoGps.png"
            });
            iconoGps.applyProperties(style_iconoGps);
            var label1 = Ti.UI.createLabel({
                text: datamodel_Agenda_Detail.result[0].nombre
            });
            label1.applyProperties(textName);
            var label2 = Ti.UI.createLabel({
                text: datamodel_Agenda_Detail.result[0].fecha_evento
            });
            label2.applyProperties(textDate);
            var webviewDescription = Ti.UI.createWebView({
                enableZoomControls: "false"
            });
            webviewDescription.applyProperties(textDescription);
            webviewDescription.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/><html style="font-size:13px">' + datamodel_Agenda_Detail.result[0].descripcion + "</html>";
            viewImage.add(imageRemote1);
            viewName.add(iconoGps);
            viewName.add(label1);
            viewName.add(label2);
            $.containerAgendaDetail.add(viewImage);
            $.containerAgendaDetail.add(viewName);
            $.containerAgendaDetail.add(webviewDescription);
        } else managment_View.OpenInfoWindow(L("text_6"));
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "agendaDetail";
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
    $.__views.viewAgendaDetail = Ti.UI.createView({
        id: "viewAgendaDetail"
    });
    $.__views.viewAgendaDetail && $.addTopLevelView($.__views.viewAgendaDetail);
    $.__views.containerScroll = Ti.UI.createScrollView({
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.SIZE,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        width: Ti.UI.FILL,
        top: 0,
        backgroundColor: Alloy.CFG.WHITE,
        showPagingControl: "false",
        id: "containerScroll"
    });
    $.__views.viewAgendaDetail.add($.__views.containerScroll);
    $.__views.containerAgendaDetail = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: Alloy.CFG.WHITE,
        id: "containerAgendaDetail"
    });
    $.__views.containerScroll.add($.__views.containerAgendaDetail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    require("createRemoteImageView");
    var args = arguments[0] || {};
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;