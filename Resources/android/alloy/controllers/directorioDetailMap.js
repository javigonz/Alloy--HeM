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
        dataEmpresa = {
            nombre: args[0][0].nombre,
            direccion: args[0][0].direccion,
            latitud: args[0][0].latitud,
            longitud: args[0][0].longitud
        };
        var rc = MapModule.isGooglePlayServicesAvailable();
        switch (rc) {
          case MapModule.SUCCESS:
            Ti.API.info("Google Play services is installed.");
            createMapModule();
            break;

          case MapModule.SERVICE_MISSING:
            managment_View.OpenInfoWindow(L("text_7"));
            Ti.App.fireEvent("closeLoading");
            break;

          case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
            managment_View.OpenInfoWindow(L("text_8"));
            Ti.App.fireEvent("closeLoading");
            break;

          case MapModule.SERVICE_DISABLED:
            managment_View.OpenInfoWindow(L("text_9"));
            Ti.App.fireEvent("closeLoading");
            break;

          case MapModule.SERVICE_INVALID:
            managment_View.OpenInfoWindow(L("text_10"));
            Ti.App.fireEvent("closeLoading");
            break;

          default:
            managment_View.OpenInfoWindow(L("text_6"));
            Ti.App.fireEvent("closeLoading");
        }
        Alloy.Globals.ActualContainer = $.viewDirectorioDetailMap;
    }
    function createMapModule() {
        Ti.API.info("latitud: " + dataEmpresa.latitud);
        Ti.API.info("longitud: " + dataEmpresa.longitud);
        Ti.API.info("nombre: " + dataEmpresa.nombre);
        Ti.API.info("direccion: " + dataEmpresa.direccion);
        var empresa1 = MapModule.createAnnotation({
            latitude: dataEmpresa.latitud,
            longitude: dataEmpresa.longitud,
            pincolor: MapModule.ANNOTATION_AZURE,
            title: dataEmpresa.nombre,
            subtitle: dataEmpresa.direccion,
            myid: 1
        });
        var map1 = MapModule.createView({
            mapType: MapModule.NORMAL_TYPE,
            region: {
                latitude: dataEmpresa.latitud,
                longitude: dataEmpresa.longitud,
                latitudeDelta: .1,
                longitudeDelta: .1
            },
            userLocation: true,
            animate: true,
            pitchEnabled: true,
            rotateEnabled: true,
            showsBuildings: true,
            showsPointsOfInterest: true,
            annotations: [ empresa1 ]
        });
        map1.addEventListener("complete", function() {
            Ti.App.fireEvent("closeLoading");
        });
        map1.addEventListener("click", function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        });
        $.containerDirectorioDetailMap.add(map1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "directorioDetailMap";
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
    $.__views.viewDirectorioDetailMap = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        id: "viewDirectorioDetailMap"
    });
    $.__views.viewDirectorioDetailMap && $.addTopLevelView($.__views.viewDirectorioDetailMap);
    $.__views.containerDirectorioDetailMap = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        layout: "vertical",
        id: "containerDirectorioDetailMap"
    });
    $.__views.viewDirectorioDetailMap.add($.__views.containerDirectorioDetailMap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var MapModule = require("ti.map");
    var managment_View = require("managment_View");
    require("managment_Data");
    var args = arguments[0] || {};
    var dataEmpresa;
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;