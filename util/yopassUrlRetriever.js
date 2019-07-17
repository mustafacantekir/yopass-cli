var DEFAULT_YOPASS_API_URL = "https://api.yopass.se";
var DEFAULT_YOPASS_UI_URL = "https://yopass.se";

module.exports = {
    getYopassAPIURL: function () {
        return getYopassAPIURL();
    },
    getLinks: function (uuid, decryptionKey) {
        var yopassUIURL = getYopassUIURL();
        var shortLink = yopassUIURL + "/#/s/" + uuid;
        var oneClickLink = yopassUIURL + "/#/s/" + uuid + "/" + decryptionKey;

        return {
            short: shortLink,
            oneClick: oneClickLink
        };
    }
};

function getYopassAPIURL() {
    var customYopassAPIURL = process.env.YOPASS_API_URL;
    if (customYopassAPIURL === undefined) {
        return DEFAULT_YOPASS_API_URL;
    }
    return removeTrailingSlashFromURL(customYopassAPIURL);
}

function getYopassUIURL() {
    if (process.env.YOPASS_API_URL === undefined && process.env.YOPASS_UI_URL === undefined) {
        return DEFAULT_YOPASS_UI_URL;
    }

    if (process.env.YOPASS_UI_URL !== undefined) {
        return removeTrailingSlashFromURL(process.env.YOPASS_UI_URL);
    }

    return removeTrailingSlashFromURL(process.env.YOPASS_API_URL);
}

function removeTrailingSlashFromURL(url) {
    return url.endsWith("/") ? url.slice(0, -1) : url;
}