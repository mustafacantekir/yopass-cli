var sender = require("../util/sender");
var sjcl = require("sjcl");

exports.command = 'decrypt <uniqueIdentifier> <decryptionKey> [options]';
exports.desc = 'Decrypt <uniqueIdentifier> with <decryptionKey>';
exports.handler = function (argv) {
    var uniqueIdentifier = argv.uniqueIdentifier;
    var decryptionKey = argv.decryptionKey;

    sender.getEncryptedMessage(uniqueIdentifier).then(function (value) {
        var message = value.message;
        try {
            var decryptedMessage = sjcl.decrypt(decryptionKey, message);
            console.log("Decrypted Message: ", decryptedMessage);
        } catch (e) {
            console.log("Error occurred while decrypting the message");
            process.exit();
        }
    }).catch(function () {
        console.log("Error occurred while getting encrypted message")
    });
};