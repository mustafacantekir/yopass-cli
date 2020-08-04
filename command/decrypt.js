var sender = require("../util/sender");
var openpgp = require("openpgp");

exports.command = 'decrypt <uniqueIdentifier> <decryptionKey> [options]';
exports.desc = 'Decrypt <uniqueIdentifier> with <decryptionKey>';
exports.handler = function (argv) {
    var uniqueIdentifier = argv.uniqueIdentifier;
    var decryptionKey = argv.decryptionKey;

    sender.getEncryptedMessage(uniqueIdentifier).then(function (value) {
        try {
            openpgp.message.readArmored(value.message).then(function (message) {
                openpgp.decrypt({
                    message: message,
                    passwords: decryptionKey,
                    format: 'utf8'
                }).then(function (decryptedMessage) {
                    console.log("Decrypted Message: ", decryptedMessage.data);
                });
            })
        } catch (e) {
            console.log("Error occurred while decrypting the message");
            process.exit();
        }
    }).catch(function () {
        console.log("Error occurred while getting encrypted message")
    });
};