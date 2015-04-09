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
        if ("iphone" == Ti.Platform.osname) {
            $.viewFooter.top = Ti.Platform.displayCaps.platformHeight - 80;
            var widthButton = Alloy.CFG.WidthDeviceIphone / 5;
        } else {
            $.viewFooter.top = Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160) - 105;
            var widthButton = Alloy.CFG.WidthDeviceAndroid / 5;
        }
        var MenuView1 = $.createStyle({
            classes: [ "MenuView1" ]
        });
        var MenuView2 = $.createStyle({
            classes: [ "MenuView2" ]
        });
        var MenuView3 = $.createStyle({
            classes: [ "MenuView3" ]
        });
        var MenuView4 = $.createStyle({
            classes: [ "MenuView4" ]
        });
        var MenuView5 = $.createStyle({
            classes: [ "MenuView5" ]
        });
        $.createStyle({
            classes: [ "MenuViewOver" ]
        });
        var MenuText = $.createStyle({
            classes: [ "MenuText" ]
        });
        var MenuImage1 = $.createStyle({
            classes: [ "MenuImage1" ]
        });
        var MenuImage2 = $.createStyle({
            classes: [ "MenuImage2" ]
        });
        var MenuImage3 = $.createStyle({
            classes: [ "MenuImage3" ]
        });
        var MenuImage4 = $.createStyle({
            classes: [ "MenuImage4" ]
        });
        var MenuImage5 = $.createStyle({
            classes: [ "MenuImage5" ]
        });
        var view1 = Ti.UI.createView({});
        view1.applyProperties(MenuView1);
        view1.width = widthButton;
        view1.addEventListener("click", eventHandler_HechoEnMijas);
        var label1 = Ti.UI.createLabel({});
        label1.applyProperties(MenuText);
        label1.width = widthButton - 10;
        label1.text = L("text_1");
        var image1 = Titanium.UI.createImageView({
            image: "/images/menuIcon1.png"
        });
        image1.applyProperties(MenuImage1);
        view1.add(image1);
        view1.add(label1);
        $.viewFooter.add(view1);
        var view2 = Ti.UI.createView({});
        view2.applyProperties(MenuView2);
        view2.width = widthButton;
        view2.addEventListener("click", eventHandler_Directorio);
        var label2 = Ti.UI.createLabel({});
        label2.applyProperties(MenuText);
        label2.width = widthButton - 5;
        label2.text = L("text_2");
        var image2 = Titanium.UI.createImageView({
            image: "/images/menuIcon2.png"
        });
        image2.applyProperties(MenuImage2);
        view2.add(image2);
        view2.add(label2);
        $.viewFooter.add(view2);
        var view3 = Ti.UI.createView({});
        view3.applyProperties(MenuView3);
        view3.width = widthButton;
        view3.addEventListener("click", eventHandler_Home);
        var label3 = Ti.UI.createLabel({});
        label3.applyProperties(MenuText);
        label3.width = widthButton - 10;
        label3.text = L("text_3");
        var image3 = Titanium.UI.createImageView({
            image: "/images/menuIcon3.png"
        });
        image3.applyProperties(MenuImage3);
        view3.add(image3);
        view3.add(label3);
        $.viewFooter.add(view3);
        var view4 = Ti.UI.createView({});
        view4.applyProperties(MenuView4);
        view4.width = widthButton;
        view4.addEventListener("click", eventHandler_Agenda);
        var label4 = Ti.UI.createLabel({});
        label4.applyProperties(MenuText);
        label4.width = widthButton - 10;
        label4.text = L("text_4");
        var image4 = Titanium.UI.createImageView({
            image: "/images/menuIcon4.png"
        });
        image4.applyProperties(MenuImage4);
        view4.add(image4);
        view4.add(label4);
        $.viewFooter.add(view4);
        var view5 = Ti.UI.createView({});
        view5.applyProperties(MenuView5);
        view5.width = widthButton;
        view5.addEventListener("click", eventHandler_Ofertas);
        var label5 = Ti.UI.createLabel({});
        label5.applyProperties(MenuText);
        label5.width = widthButton - 10;
        label5.text = L("text_5");
        var image5 = Titanium.UI.createImageView({
            image: "/images/menuIcon5.png"
        });
        image5.applyProperties(MenuImage5);
        view5.add(image5);
        view5.add(label5);
        $.viewFooter.add(view5);
        $.viewOver.width = widthButton;
    }
    function changeSection() {
        if ("iphone" == Ti.Platform.osname) var widthButton = Alloy.CFG.WidthDeviceIphone / 5; else var widthButton = Alloy.CFG.WidthDeviceAndroid / 5;
        switch (Alloy.Globals.ActualSection) {
          case "home":
            $.viewOver.left = 2 * widthButton;
            break;

          case "hechoEnMijas":
          case "hechoEnMijasDetail":
            $.viewOver.left = 0;
            break;

          case "directorio":
          case "directorioDetail":
          case "directorioDetailMap":
            $.viewOver.left = widthButton;
            break;

          case "agenda":
          case "agendaDetail":
            $.viewOver.left = 3 * widthButton;
            break;

          case "ofertas":
          case "ofertasDetail":
            $.viewOver.left = 4 * widthButton;
            break;

          default:
            $.viewOver.left = 2 * widthButton;
        }
    }
    function eventHandler_HechoEnMijas() {
        managment_View.OpenSectionParam("hechoEnMijas", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Directorio() {
        managment_View.OpenSectionParam("directorio", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Home() {
        managment_View.OpenSectionParam("home", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Agenda() {
        managment_View.OpenSectionParam("agenda", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Ofertas() {
        managment_View.OpenSectionParam("ofertas", [], "", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "footer";
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
    $.__views.viewFooter = Ti.UI.createView({
        height: 80,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.BLUE,
        layout: "horizontal",
        id: "viewFooter"
    });
    $.__views.viewFooter && $.addTopLevelView($.__views.viewFooter);
    $.__views.viewOver = Ti.UI.createView({
        height: 8,
        backgroundColor: Alloy.CFG.BLACK,
        bottom: 0,
        opacity: 1,
        id: "viewOver"
    });
    $.__views.viewOver && $.addTopLevelView($.__views.viewOver);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    Ti.App.addEventListener("changeSection", function() {
        changeSection();
    });
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;