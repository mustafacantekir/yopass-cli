var fetch = require("node-fetch");
var yopassUrlRetriever = require("../util/yopassUrlRetriever");

module.exports = {
    sendSecret: function (expirationTime, secret) {
        return fetch(yopassUrlRetriever.getYopassAPIURL() + "/secret", {
            body: JSON.stringify({
                expiration: expirationTime,
                secret: secret
            }),
            method: 'POST'
        }).then(function (response) {
            return response.json();
        }).catch(function () {
            console.log("Error occurred while sending secret to API");
            process.exit();
        });
    },
    getEncryptedMessage: function (key) {
        return fetch(yopassUrlRetriever.getYopassAPIURL() + "/secret/" + key, {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        });
    }
};