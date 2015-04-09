function ACSPush(acsuid, acspwd) {
    this.acsuid = acsuid || false;
    this.acspwd = acspwd || false;
    this.token = "";
}

function loginToACS(acsuid, acspwd, token, channel_name) {
    if (!acsuid && !acspwd) {
        console.log("loginToACS -> subscribe as guest");
        subscribeForPushNotifications(token, channel_name, true);
        return;
    }
    Cloud.Users.login({
        login: acsuid,
        password: acspwd
    }, function(e) {
        if (e.success) {
            {
                e.users[0];
            }
            console.log("loginToACS -> Status: Successful");
            subscribeForPushNotifications(token, channel_name);
        } else {
            console.log("loginToACS -> Error :" + e.message);
            console.log("Error Params :" + acsuid + acspwd + token + channel_name);
        }
    });
}

function subscribeForPushNotifications(token, channel_name, subscribeAsGuest) {
    var prams = {
        channel: channel_name,
        type: "ios",
        device_token: token
    };
    var callBack = function(e) {
        console.log(e.success ? "subscribeForPushNotifications -> Status: Successful [" + channel_name + "]" : "subscribeForPushNotifications -> Error " + token + "(subscribeToServerPush) :\\n" + (e.error && e.message || JSON.stringify(e)));
    };
    subscribeAsGuest ? Cloud.PushNotifications.subscribeToken(prams, callBack) : Cloud.PushNotifications.subscribe(prams, callBack);
}

var Cloud = require("ti.cloud");

ACSPush.prototype.registerDevice = function(channel_name, onReceive, onLaunched, onFocused, androidOptions, blackberryOptions) {
    function deviceTokenSuccess(e) {
        console.log("Device Token: " + e.deviceToken);
        token = e.deviceToken;
        that.token = token;
        loginToACS(that.acsuid, that.acspwd, token, channel_name);
    }
    function deviceTokenError(e) {
        console.log("Token Error: " + e.error);
    }
    function receivePush(e) {
        onReceive(e.data);
        console.log("push notification received: " + JSON.stringify(e.data));
    }
    function registerForPush() {
        Ti.Network.registerForPushNotifications({
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush
        });
        Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
    }
    var that = this, token = "";
    if (parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
        Ti.App.iOS.addEventListener("usernotificationsettings", registerForPush);
        Ti.App.iOS.registerUserNotificationSettings({
            types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE ]
        });
    } else Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
};

ACSPush.prototype.unsubscribeFromChannel = function(channel_name, token, onSuccess, onFail) {
    Cloud.PushNotifications.unsubscribeToken({
        channel: channel_name,
        device_token: token
    }, function(e) {
        e.success ? onSuccess(e) : onFail(e);
    });
};

ACSPush.prototype.getToken = function() {
    return this.token;
};

exports.ACSPush = ACSPush;