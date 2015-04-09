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
        type: "android",
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
    var that = this, token = "";
    var CloudPush = require("ti.cloudpush");
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
    CloudPush.focusAppOnPush = androidOptions.focusAppOnPush || false;
    CloudPush.showAppOnTrayClick = androidOptions.showAppOnTrayClick || false;
    CloudPush.showTrayNotification = androidOptions.showTrayNotification || false;
    CloudPush.showTrayNotificationsWhenFocused = androidOptions.showTrayNotificationsWhenFocused || false;
    CloudPush.singleCallback = androidOptions.singleCallback || true;
    CloudPush.addEventListener("callback", onReceive);
    CloudPush.addEventListener("trayClickLaunchedApp", onLaunched);
    CloudPush.addEventListener("trayClickFocusedApp", onFocused);
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