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
        Alloy.Globals.ActualContainer = $.viewOfertas;
        Ti.App.addEventListener("loadOfertas", loadOfertas);
        managment_Data.LoadWebService_Ofertas();
    }
    function loadOfertas() {
        Ti.App.removeEventListener("loadOfertas", loadOfertas);
        if ("ok" == datamodel_Ofertas.code) {
            var rowList = $.createStyle({
                classes: [ "rowList" ]
            });
            {
                $.createStyle({
                    classes: [ "rowListTitle" ]
                });
            }
            {
                $.createStyle({
                    classes: [ "viewImage" ]
                });
            }
            {
                $.createStyle({
                    classes: [ "productImage" ]
                });
            }
            var textName = $.createStyle({
                classes: [ "textName" ]
            });
            {
                $.createStyle({
                    classes: [ "textNameTitle" ]
                });
            }
            {
                $.createStyle({
                    classes: [ "textDate" ]
                });
            }
            {
                $.createStyle({
                    classes: [ "textDescription" ]
                });
            }
            var viewDescription = $.createStyle({
                classes: [ "viewDescription" ]
            });
            var rowLine = $.createStyle({
                classes: [ "rowLine" ]
            });
            {
                $.createStyle({
                    classes: [ "iconView" ]
                });
            }
            {
                $.createStyle({
                    classes: [ "icon" ]
                });
            }
            var iconArrow = $.createStyle({
                classes: [ "iconArrow" ]
            });
            for (var i = 0; i <= datamodel_Ofertas.result.length - 1; i++) {
                var row1 = Ti.UI.createView({
                    id: datamodel_Ofertas.result[i].id
                });
                row1.applyProperties(rowList);
                row1.addEventListener("click", handlerEvent_ofertasDetail);
                var row1Line = Ti.UI.createView({
                    id: datamodel_Ofertas.result[i].id
                });
                row1Line.applyProperties(rowLine);
                var row1Arrow = Ti.UI.createImageView({
                    image: "/images/iconArrowGreen.png",
                    id: datamodel_Ofertas.result[i].id
                });
                row1Arrow.applyProperties(iconArrow);
                var view2 = Ti.UI.createView({
                    id: datamodel_Ofertas.result[i].id
                });
                view2.applyProperties(viewDescription);
                var label1 = Ti.UI.createLabel({
                    text: datamodel_Ofertas.result[i].nombre,
                    id: datamodel_Ofertas.result[i].id
                });
                label1.applyProperties(textName);
                view2.add(label1);
                row1.add(view2);
                row1.add(row1Line);
                row1.add(row1Arrow);
                $.scrollableOfertasSlider.add(row1);
            }
        } else managment_View.OpenInfoWindow(L("text_6"));
        Ti.App.fireEvent("closeLoading");
    }
    function handlerEvent_ofertasDetail(e) {
        e.source.removeEventListener("click", handlerEvent_ofertasDetail);
        managment_View.OpenSectionParam("ofertasDetail", [ e.source.id ], "", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ofertas";
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
    $.__views.viewOfertas = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewOfertas"
    });
    $.__views.viewOfertas && $.addTopLevelView($.__views.viewOfertas);
    $.__views.containerOfertas = Ti.UI.createView({
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        layout: "vertical",
        id: "containerOfertas"
    });
    $.__views.viewOfertas.add($.__views.containerOfertas);
    $.__views.scrollableOfertasSlider = Ti.UI.createScrollView({
        contentWidth: Ti.UI.FILL,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        backgroundColor: Alloy.CFG.WHITE,
        layout: "vertical",
        top: 0,
        showPagingControl: "false",
        id: "scrollableOfertasSlider"
    });
    $.__views.containerOfertas.add($.__views.scrollableOfertasSlider);
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