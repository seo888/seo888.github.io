var z = "";
var t = new Date;
var rsaEncrypt = function (a) {
    a = encodeURI(a);
    setMaxDigits(129);
    var b = z.split(",");
    var c = new RSAKeyPair(b[0], "", b[1]);
    var d = encryptedString(c, a);
    return d;
};
var GetRsaEncrypt = function (a) {
    try {
        $.ajax({
            url: "/RsaKey/GetEncrypt",
            type: "GET",
            async: false,
            success: function (a) {
                z = a.publicKey;
                t = new Date;
            }
        });
    } catch (e) {
        $.ajax({
            url: "/RsaKey/GetEncrypt",
            type: "GET",
            async: false,
            success: function (a) {
                z = a.publicKey;
                t = new Date;
            }
        });
    }
};

var GetUpgradeRsaEncrypt = function (a) {
    try {
        $.ajax({
            url: "/Upgrade/GetEncrypt",
            type: "GET",
            async: false,
            success: function (a) {
                z = a.publicKey;
                t = new Date;
            }
        });
    } catch (e) {
        $.ajax({
            url: "/Upgrade/GetEncrypt",
            type: "GET",
            async: false,
            success: function (a) {
                z = a.publicKey;
                t = new Date;
            }
        });
    }
};

var GetMinuteLeave = function (a) {
    var b = (new Date).getTime() - a.getTime();
    return Math.floor(b / (ji60 * 1e3));
};