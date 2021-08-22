"use strict";
exports.__esModule = true;
/**
 * TwitchAuth is a simple auth data object
 */
var TwitchAuth = /** @class */ (function () {
    function TwitchAuth(_a) {
        var oauthToken = _a.oauthToken, botUsername = _a.botUsername, channel = _a.channel;
        this.oauthToken = oauthToken;
        this.botUsername = botUsername;
        this.channel = channel;
    }
    return TwitchAuth;
}());
exports.TwitchAuth = TwitchAuth;
