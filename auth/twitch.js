"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TwitchAuth is a simple auth data object
 */
class TwitchAuth {
    constructor({ oauthToken, botUsername, channel }) {
        this.oauthToken = oauthToken;
        this.botUsername = botUsername;
        this.channel = channel;
    }
}
exports.TwitchAuth = TwitchAuth;
