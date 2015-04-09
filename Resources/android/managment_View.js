var utils = require("utils");

var FadeOut_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 0,
    duration: 300
});

var FadeIn_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 1,
    duration: 300
});

exports.OpenSectionParam = function(window, objectAddress, objectWindowFrom, viewContainer) {
    Ti.App.fireEvent("openLoading");
    Ti.UI.Android.hideSoftKeyboard();
    var viewData = [ {
        section: window,
        objectData: objectAddress,
        objectWindowFrom: objectWindowFrom,
        container: viewContainer
    } ];
    Alloy.Globals.ViewActive.push(viewData);
    Alloy.Globals.ActualSection = window;
    var miniTimer = setTimeout(function() {
        clearInterval(miniTimer);
        utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
        Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(window, [ objectAddress ]).getView());
        Ti.App.fireEvent("changeSection");
    }, 300);
};

exports.closeActualSection = function() {
    if ("false" == Alloy.Globals.IsLoading) {
        Ti.UI.Android.hideSoftKeyboard();
        if (1 == Alloy.Globals.ViewActive.length) ; else {
            Ti.App.fireEvent("openLoading");
            {
                Alloy.Globals.ActualContainer;
            }
            var i = Alloy.Globals.ViewActive.length - 2;
            Alloy.Globals.ActualSection = Alloy.Globals.ViewActive[i][0].section;
            var miniTimer = setTimeout(function() {
                clearInterval(miniTimer);
                utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
                Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(Alloy.Globals.ViewActive[i][0].section, [ Alloy.Globals.ViewActive[i][0].objectData ]).getView());
                Alloy.Globals.ViewActive.pop();
                Ti.App.fireEvent("changeSection");
            }, 300);
        }
    }
};

exports.OpenInfoWindow = function(message) {
    var alertDialog = Titanium.UI.createAlertDialog({
        title: "Info",
        message: message,
        buttonNames: [ L("text_15") ]
    });
    alertDialog.show();
};

exports.OpenInfoWindowWithListener = function(message) {
    var alertDialog = Titanium.UI.createAlertDialog({
        title: "Info",
        message: message,
        buttonNames: [ L("text_4") ]
    });
    alertDialog.addEventListener("click", function() {
        Ti.App.fireEvent("handler_continue");
    });
    alertDialog.show();
};

exports.OpenSelectWindow = function(message) {
    var opts = {
        title: message,
        options: [ L("text_142"), L("text_14") ]
    };
    var dialog = Ti.UI.createOptionDialog(opts);
    return dialog;
};

exports.OpenSelectWindow2 = function(message) {
    var opts = {
        title: message,
        options: [ L("text_142"), L("text_210") ]
    };
    var dialog = Ti.UI.createOptionDialog(opts);
    return dialog;
};

exports.ShowPushCart = function(num) {
    if (0 == num) {
        Alloy.Globals.ActivePush = "false";
        Alloy.Globals.numPush = num;
    } else {
        Alloy.Globals.ActivePush = "true";
        Alloy.Globals.numPush = num;
    }
    Ti.App.fireEvent("pushCart_change");
};