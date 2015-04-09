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
        Alloy.Globals.ActualContainer = $.viewDirectorio;
        Ti.App.addEventListener("loadDirectorioSectores", loadDirectorioSectores);
        managment_Data.LoadWebService_Directorio_Sectores();
    }
    function loadDirectorioSectores() {
        Ti.App.removeEventListener("loadDirectorioSectores", loadDirectorioSectores);
        if ("ok" == datamodel_EmpresasSectores.code) {
            var picker_data = [];
            for (var i = 0; i <= datamodel_EmpresasSectores.result.length - 1; i++) {
                var itemPicker = Ti.UI.createPickerRow({
                    title: datamodel_EmpresasSectores.result[i].nombre,
                    id: datamodel_EmpresasSectores.result[i].id
                });
                picker_data.push(itemPicker);
            }
            createComboCategories(picker_data);
            Ti.App.addEventListener("loadEmpresasSector", loadEmpresasSector);
            managment_Data.LoadWebService_Empresas_Sector(datamodel_EmpresasSectores.result[0].id);
        } else {
            managment_View.OpenInfoWindow(L("text_6"));
            Ti.App.fireEvent("closeLoading");
        }
    }
    function loadEmpresasSector() {
        Ti.App.removeEventListener("loadEmpresasSector", loadEmpresasSector);
        if ("ok" == datamodel_EmpresasSector.code) {
            var rowList = $.createStyle({
                classes: [ "rowList" ]
            });
            var viewImage = $.createStyle({
                classes: [ "viewImage" ]
            });
            var ProductImage = $.createStyle({
                classes: [ "ProductImage" ]
            });
            var textName = $.createStyle({
                classes: [ "textName" ]
            });
            var textDate = $.createStyle({
                classes: [ "textDate" ]
            });
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
            var iconView = $.createStyle({
                classes: [ "iconView" ]
            });
            {
                $.createStyle({
                    classes: [ "icon" ]
                });
            }
            var iconArrow = $.createStyle({
                classes: [ "iconArrow" ]
            });
            for (var i = 0; i <= datamodel_EmpresasSector.result.length - 1; i++) {
                var row1 = Ti.UI.createView({
                    id: datamodel_EmpresasSector.result[i].id
                });
                row1.applyProperties(rowList);
                row1.addEventListener("click", handlerEvent_directorioDetail);
                var row1Line = Ti.UI.createView({
                    id: datamodel_EmpresasSector.result[i].id
                });
                row1Line.applyProperties(rowLine);
                var row1Arrow = Ti.UI.createImageView({
                    image: "/images/iconArrowBlue.png",
                    id: datamodel_EmpresasSector.result[i].id
                });
                row1Arrow.applyProperties(iconArrow);
                var view1 = Ti.UI.createView({
                    id: datamodel_EmpresasSector.result[i].id
                });
                view1.applyProperties(viewImage);
                var imageRemote1;
                var imageRemote1 = Titanium.UI.createImageView({
                    image: Alloy.Globals.UrlImages + datamodel_EmpresasSector.result[i].imagen1,
                    defaultImage: "/images/download.png",
                    id: datamodel_EmpresasSector.result[i].id
                });
                imageRemote1.applyProperties(ProductImage);
                var view2 = Ti.UI.createView({
                    id: datamodel_EmpresasSector.result[i].id
                });
                view2.applyProperties(viewDescription);
                var label1 = Ti.UI.createLabel({
                    text: datamodel_EmpresasSector.result[i].nombre,
                    id: datamodel_EmpresasSector.result[i].id
                });
                label1.applyProperties(textName);
                var view3 = Ti.UI.createView({
                    id: datamodel_EmpresasSector.result[i].id
                });
                view3.applyProperties(iconView);
                var label2 = Ti.UI.createLabel({
                    text: datamodel_EmpresasSector.result[i].direccion,
                    id: datamodel_EmpresasSector.result[i].id
                });
                label2.applyProperties(textDate);
                view1.add(imageRemote1);
                view2.add(label1);
                view3.add(label2);
                view2.add(view3);
                row1.add(view1);
                row1.add(view2);
                row1.add(row1Line);
                row1.add(row1Arrow);
                $.scrollableDirectorySlider.add(row1);
            }
        } else managment_View.OpenInfoWindow(L("text_6"));
        Ti.App.fireEvent("closeLoading");
    }
    function createComboCategories(picker_data) {
        var picker;
        var pickerStyle = $.createStyle({
            classes: [ "pickerStyle" ]
        });
        var picker = Titanium.UI.createPicker({});
        picker.selectionIndicator = "false";
        picker.applyProperties(pickerStyle);
        picker.add(picker_data);
        picker.addEventListener("change", function() {
            $.comboCategories.value = picker.getSelectedRow(0).title;
            Ti.App.fireEvent("openLoading");
            utils.removeAllChildren($.scrollableDirectorySlider);
            Ti.App.addEventListener("loadEmpresasSector", loadEmpresasSector);
            managment_Data.LoadWebService_Empresas_Sector(picker.getSelectedRow(0).id);
        });
        $.comboCategories.add(picker);
    }
    function handlerEvent_directorioDetail(e) {
        e.source.removeEventListener("click", handlerEvent_directorioDetail);
        managment_View.OpenSectionParam("directorioDetail", [ e.source.id ], "directorio", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "directorio";
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
    $.__views.viewDirectorio = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewDirectorio"
    });
    $.__views.viewDirectorio && $.addTopLevelView($.__views.viewDirectorio);
    $.__views.containerDirectorio = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        layout: "vertical",
        id: "containerDirectorio"
    });
    $.__views.viewDirectorio.add($.__views.containerDirectorio);
    $.__views.viewCategories = Ti.UI.createView({
        height: 60,
        width: Ti.UI.FILL,
        top: 0,
        id: "viewCategories"
    });
    $.__views.containerDirectorio.add($.__views.viewCategories);
    $.__views.comboCategories = Ti.UI.createView({
        height: 40,
        width: "95%",
        borderColor: Alloy.CFG.GREY_LIGHT,
        top: 12,
        paddingLeft: 5,
        color: Alloy.CFG.BLACK,
        left: 10,
        borderWidth: "2px",
        backgroundColor: Alloy.CFG.WHITE,
        font: {
            fontFamily: Alloy.CFG.FONT_HELVETICA_NEUE_LT_LIGHT,
            fontSize: 14,
            fontWeight: "normal"
        },
        id: "comboCategories"
    });
    $.__views.viewCategories.add($.__views.comboCategories);
    $.__views.scrollableDirectorySlider = Ti.UI.createScrollView({
        contentWidth: Ti.UI.FILL,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        backgroundColor: Alloy.CFG.WHITE,
        layout: "vertical",
        top: 0,
        showPagingControl: "false",
        id: "scrollableDirectorySlider"
    });
    $.__views.containerDirectorio.add($.__views.scrollableDirectorySlider);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    require("createRemoteImageView");
    var utils = require("utils");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;