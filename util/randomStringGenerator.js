module.exports = {
    generate: function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 22; i++) {
            text += possible.charAt(randomInt(0, possible.length));
        }
        return text;
    }
};

var crypto = require('crypto');

function randomInt(min, max) {
    var byteArray = crypto.randomBytes(8);
    var range = max - min;
    var maxRange = 256;
    if (byteArray[0] >= Math.floor(maxRange / range) * range) {
        return randomInt(min, max);
    }
    return min + (byteArray[0] % range);
}