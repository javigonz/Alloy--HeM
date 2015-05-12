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
        Alloy.Globals.ActualContainer = $.viewHechoenmijas;
        Ti.App.addEventListener("loadHechoEnMijas", loadHechoEnMijas);
        managment_Data.LoadWebService_HechoEnMijas();
    }
    function loadHechoEnMijas() {
        Ti.App.removeEventListener("loadHechoEnMijas", loadHechoEnMijas);
        if ("ok" == datamodel_HechoEnMijas.code) {
            var rowList = $.createStyle({
                classes: [ "rowList" ]
            });
            var viewImage = $.createStyle({
                classes: [ "viewImage" ]
            });
            var productImage = $.createStyle({
                classes: [ "productImage" ]
            });
            var textName = $.createStyle({
                classes: [ "textName" ]
            });
            var textDate = $.createStyle({
                classes: [ "textDate" ]
            });
            var textDescription = $.createStyle({
                classes: [ "textDescription" ]
            });
            var viewDescription = $.createStyle({
                classes: [ "viewDescription" ]
            });
            var rowLine = $.createStyle({
                classes: [ "rowLine" ]
            });
            var iconView = $.createStyle({
                classes: [ "iconView" ]
            });
            var icon = $.createStyle({
                classes: [ "icon" ]
            });
            var iconArrow = $.createStyle({
                classes: [ "iconArrow" ]
            });
            var rows = [];
            for (var i = 0; i <= datamodel_HechoEnMijas.result.length - 1; i++) {
                var row1 = Ti.UI.createTableViewRow({
                    id: datamodel_HechoEnMijas.result[i].id
                });
                row1.applyProperties(rowList);
                row1.addEventListener("click", handlerEvent_hechoEnMijasDetail);
                var row1Line = Ti.UI.createView({
                    id: datamodel_HechoEnMijas.result[i].id
                });
                row1Line.applyProperties(rowLine);
                var row1Arrow = Ti.UI.createImageView({
                    image: "/images/iconArrowGreen2.png",
                    id: datamodel_HechoEnMijas.result[i].id
                });
                row1Arrow.applyProperties(iconArrow);
                var view1 = Ti.UI.createView({
                    id: datamodel_HechoEnMijas.result[i].id
                });
                view1.applyProperties(viewImage);
                if ("iphone" == Ti.Platform.osname) {
                    var imageRemote1 = remoteView.createRemoteImageView({
                        image: Alloy.Globals.UrlImages + datamodel_HechoEnMijas.result[i].imagen1,
                        defaultImage: "/images/download.png",
                        id: datamodel_HechoEnMijas.result[i].id
                    });
                    imageRemote1.applyProperties(productImage);
                } else {
                    var imageRemote1 = Titanium.UI.createImageView({
                        image: Alloy.Globals.UrlImages + datamodel_HechoEnMijas.result[i].imagen1,
                        defaultImage: "/images/download.png",
                        id: datamodel_HechoEnMijas.result[i].id
                    });
                    imageRemote1.applyProperties(productImage);
                }
                var view2 = Ti.UI.createView({
                    id: datamodel_HechoEnMijas.result[i].id
                });
                view2.applyProperties(viewDescription);
                var label1 = Ti.UI.createLabel({
                    text: datamodel_HechoEnMijas.result[i].nombre,
                    id: datamodel_HechoEnMijas.result[i].id
                });
                label1.applyProperties(textName);
                var view3 = Ti.UI.createView({
                    id: datamodel_HechoEnMijas.result[i].id
                });
                view3.applyProperties(iconView);
                var icon1 = Titanium.UI.createImageView({
                    image: "/images/iconDateGreen.png",
                    id: datamodel_HechoEnMijas.result[i].id
                });
                icon1.applyProperties(icon);
                var label2 = Ti.UI.createLabel({
                    text: datamodel_HechoEnMijas.result[i].fecha_noticia,
                    id: datamodel_HechoEnMijas.result[i].id
                });
                label2.applyProperties(textDate);
                var label3 = Ti.UI.createLabel({
                    text: datamodel_HechoEnMijas.result[i].descripcion_corta,
                    id: datamodel_HechoEnMijas.result[i].id
                });
                label3.applyProperties(textDescription);
                view1.add(imageRemote1);
                view2.add(label1);
                view3.add(icon1);
                view3.add(label2);
                view2.add(view3);
                view2.add(label3);
                row1.add(view1);
                row1.add(view2);
                row1.add(row1Arrow);
                rows.push(row1);
            }
        } else managment_View.OpenInfoWindow(L("text_6"));
        $.scrollableAgendaSlider.setData(rows);
        Ti.App.fireEvent("closeLoading");
    }
    function handlerEvent_hechoEnMijasDetail(e) {
        e.source.removeEventListener("click", handlerEvent_hechoEnMijasDetail);
        managment_View.OpenSectionParam("hechoEnMijasDetail", [ e.source.id ], "", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hechoEnMijas";
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
    $.__views.viewHechoenmijas = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewHechoenmijas"
    });
    $.__views.viewHechoenmijas && $.addTopLevelView($.__views.viewHechoenmijas);
    $.__views.scrollableAgendaSlider = Ti.UI.createTableView({
        separatorColor: Alloy.CFG.GREY_LIGHT,
        top: 0,
        id: "scrollableAgendaSlider"
    });
    $.__views.viewHechoenmijas.add($.__views.scrollableAgendaSlider);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    var remoteView = require("createRemoteImageView");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;