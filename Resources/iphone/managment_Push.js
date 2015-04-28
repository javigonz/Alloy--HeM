var managment_View = require("managment_View");

var androidOptions = {
    focusAppOnPush: false,
    showAppOnTrayClick: true,
    showTrayNotification: true,
    showTrayNotificationsWhenFocused: false,
    singleCallback: true
};

var blackberryOptions = {
    appId: "4427-7h6l37627mrr0I3956a74om7643M17l7921",
    ppgUrl: "http://cp4427.pushapi.eval.blackberry.com",
    usePublicPpg: true,
    launchApplicationOnPush: true
};

var onReceive = function(evt) {
    var payload = JSON.parse(evt.payload);
    "" == payload._id ? managment_View.OpenSectionParam("hechoEnMijas", [], "", Alloy.Globals.ActualContainer) : "android" == Ti.Platform.osname ? managment_View.OpenSectionParam("hechoEnMijasDetail", [ payload._id ], "", Alloy.Globals.ActualContainer) : managment_View.OpenSectionParam("hechoEnMijasDetail", [ payload._id ], "", Alloy.Globals.ActualContainer);
};

var onLaunched = function() {};

var onFocused = function(evt) {
    console.log("A push notification was received!" + JSON.stringify(evt));
};

var ACSP = require("acspush");

if ("iphone" == Ti.Platform.osname) var ACSPush = new ACSP.ACSPush(); else var ACSPush = new ACSP.ACSPush("javi", "javi");

Ti.API.info("registrar device al PUSH");

var channel = "AllUsers";

ACSPush.registerDevice(channel, onReceive, onLaunched, onFocused, androidOptions, blackberryOptions);