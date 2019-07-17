var randomStringGenerator = require("../util/randomStringGenerator");
var sender = require("../util/sender");
var yopassUrlRetriever = require("../util/yopassUrlRetriever");
var sjcl = require("sjcl");
var clipboardy = require('clipboardy');
var fs = require("fs");

var ONE_HOUR_IN_SECONDS = 3600;
var ONE_DAY_IN_SECONDS = 86400;
var ONE_WEEK_IN_SECONDS = 604800;

var expiration = {
    h: ONE_HOUR_IN_SECONDS,
    d: ONE_DAY_IN_SECONDS,
    w: ONE_WEEK_IN_SECONDS
};

exports.command = 'encrypt <message> [options]';
exports.desc = 'Encrypt given <message>';
exports.builder = function (yargs) {
    yargs.option('expiration', {
        alias: 'e',
        describe: 'Specify expiration time',
        choices: ['h', 'd', 'w'],
        default: 'h'
    });

    yargs.option('preserve-clipboard', {
        alias: 'p',
        describe: 'Preserve clipboard',
        type: 'boolean',
        default: false
    });

    if (!process.stdin.isTTY) {
        yargs.argv._.push(fs.readFileSync(process.stdin.fd, "utf-8"));
    }
};

exports.handler = function (argv) {
    var expirationTime = expiration[argv.e];
    var secret = argv.message;
    var decryptionKey = randomStringGenerator.generate();

    var encryptedSecret = sjcl.encrypt(decryptionKey, secret).toString();

    sender.sendSecret(expirationTime, encryptedSecret).then(function (value) {
        var uuid = value.message;
        var links = yopassUrlRetriever.getLinks(uuid, decryptionKey);
        console.log("One Click Link: " + links.oneClick);
        console.log("Short Link: " + links.short);
        console.log("Decryption Key: " + decryptionKey);

        if (argv.p !== true) {
            clipboardy.writeSync(links.oneClick);
            console.log("One click link copied to clipboard.");
        }
    });
};
