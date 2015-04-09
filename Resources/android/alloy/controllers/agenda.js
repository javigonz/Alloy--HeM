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
        Alloy.Globals.ActualContainer = $.viewAgenda;
        Ti.App.addEventListener("loadAgenda", loadAgenda);
        managment_Data.LoadWebService_Agenda();
    }
    function loadAgenda() {
        Ti.App.removeEventListener("loadAgenda", loadAgenda);
        if ("ok" == datamodel_Agenda.code) {
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
            for (var i = 0; i <= datamodel_Agenda.result.length - 1; i++) {
                var row1 = Ti.UI.createView({
                    id: datamodel_Agenda.result[i].id
                });
                row1.applyProperties(rowList);
                row1.addEventListener("click", handlerEvent_agendaDetail);
                var row1Line = Ti.UI.createView({
                    id: datamodel_Agenda.result[i].id
                });
                row1Line.applyProperties(rowLine);
                var row1Arrow = Ti.UI.createImageView({
                    image: "/images/iconArrow.png"
                });
                row1Arrow.applyProperties(iconArrow);
                var view1 = Ti.UI.createView({
                    id: datamodel_Agenda.result[i].id
                });
                view1.applyProperties(viewImage);
                var imageRemote1;
                var imageRemote1 = Titanium.UI.createImageView({
                    image: Alloy.Globals.UrlImages + datamodel_Agenda.result[i].imagen1,
                    defaultImage: "/images/download.png",
                    id: datamodel_Agenda.result[i].id
                });
                imageRemote1.applyProperties(productImage);
                var view2 = Ti.UI.createView({
                    id: datamodel_Agenda.result[i].id
                });
                view2.applyProperties(viewDescription);
                var label1 = Ti.UI.createLabel({
                    text: datamodel_Agenda.result[i].nombre,
                    id: datamodel_Agenda.result[i].id
                });
                label1.applyProperties(textName);
                var view3 = Ti.UI.createView({
                    id: datamodel_Agenda.result[i].id
                });
                view3.applyProperties(iconView);
                var icon1 = Titanium.UI.createImageView({
                    image: "/images/iconDate.png",
                    id: datamodel_Agenda.result[i].id
                });
                icon1.applyProperties(icon);
                var label2 = Ti.UI.createLabel({
                    text: datamodel_Agenda.result[i].fecha_evento,
                    id: datamodel_Agenda.result[i].id
                });
                label2.applyProperties(textDate);
                var label3 = Ti.UI.createLabel({
                    text: datamodel_Agenda.result[i].descripcion_corta,
                    id: datamodel_Agenda.result[i].id
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
                row1.add(row1Line);
                row1.add(row1Arrow);
                $.scrollableAgendaSlider.add(row1);
            }
        } else managment_View.OpenInfoWindow(L("text_6"));
        Ti.App.fireEvent("closeLoading");
    }
    function handlerEvent_agendaDetail(e) {
        e.source.removeEventListener("click", handlerEvent_agendaDetail);
        managment_View.OpenSectionParam("agendaDetail", [ e.source.id ], "", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "agenda";
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
    $.__views.viewAgenda = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewAgenda"
    });
    $.__views.viewAgenda && $.addTopLevelView($.__views.viewAgenda);
    $.__views.containerAgenda = Ti.UI.createView({
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        layout: "vertical",
        top: 0,
        id: "containerAgenda"
    });
    $.__views.viewAgenda.add($.__views.containerAgenda);
    $.__views.scrollableAgendaSlider = Ti.UI.createScrollView({
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        layout: "vertical",
        top: 0,
        showPagingControl: "false",
        id: "scrollableAgendaSlider"
    });
    $.__views.containerAgenda.add($.__views.scrollableAgendaSlider);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    require("createRemoteImageView");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;