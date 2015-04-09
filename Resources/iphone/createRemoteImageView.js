exports.createRemoteImageView = function(options) {
    var imageUrl = options.image.split(" ").join("%20");
    var cacheFilename = imageUrl.replace(/[^a-zA-Z0-9\.]/gi, "_");
    var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFilename);
    delete options.image;
    var remoteImage = Titanium.UI.createImageView(options);
    if (cacheFile.exists()) remoteImage.image = cacheFile.nativePath; else {
        options.defaultImage && (remoteImage.image = options.defaultImage);
        Ti.App.addEventListener("dl_" + cacheFilename, function(e) {
            remoteImage.image = e.filename;
        });
        Ti.App.fireEvent("dl_image", {
            imageUrl: imageUrl,
            eventId: "dl_" + cacheFilename
        });
    }
    return remoteImage;
};

if (!Ti.App.hasRemoteImageViewListener) {
    Ti.App.cacheLifetime = 86400;
    Ti.App.addEventListener("dl_image", function(e) {
        var imageUrl = e.imageUrl;
        var eventId = e.eventId;
        var cacheFilename = imageUrl.replace(/[^a-zA-Z0-9\.]/gi, "_");
        var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFilename);
        var xhr = Ti.Network.createHTTPClient();
        xhr.setTimeout(4e3);
        xhr.onload = function() {
            if (200 == xhr.status) try {
                cacheFile.write(xhr.responseData);
                Ti.App.fireEvent(eventId, {
                    filename: cacheFile.nativePath
                });
                Ti.App.fireEvent();
            } catch (e) {}
        };
        imageUrl += imageUrl.indexOf("?") > 0 ? "&" + new Date().getTime() : "?" + new Date().getTime();
        xhr.open("GET", imageUrl);
        xhr.send();
    });
}