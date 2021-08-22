const file = require("../util/file")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

// Permissions needed to view and submit live chat comments
const DEFAULT_SCOPE = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl"
]

class YoutubeAuth {
    constructor({
        clientId,
        clientSecret,
        redirectURI,
        tokenFilePath,
        scope = DEFAULT_SCOPE
    }) {
        this.updateTokens = this.updateTokens.bind(this)

        this.auth = new OAuth2(clientId, clientSecret, redirectURI)
        this.auth.on("tokens", this.updateTokens)

        this.scope = scope
        this.tokenFilePath = tokenFilePath
    }

    getAuth() {
        return this.auth
    }

    /**
     * save refresh token to local file
     * @param {*} tokens 
     */
    updateTokens(tokens) {
        if (tokens.refresh_token) {
            file.save(this.tokenFilePath, JSON.stringify(tokens))
        }
    }

    /**
     * express getCode will redirect to google OAuth page.
     * may use a express Response instance to redirect to the auth page
     * @param {*} response to open the url
     */
    getCode(response) {
        const authUrl = this.auth.generateAuthUrl({
            access_type: "offline",
            scope: this.scope
        })

        response.redirect(authUrl)
    }

    /**
     * express open one url to listen google OAuth callback.
     * @param {string} code google OAuth return a code
     */
    async getTokensWithCode(code) {
        const credentials = await this.auth.getToken(code)
        await this.authorize(credentials)
    }

    async authorize({ tokens }) {
        this.auth.setCredentials(tokens)
        await file.save(this.tokenFilePath, JSON.stringify(tokens))
    }

    async checkTokens() {
        const file_contents = await file.read(this.tokenFilePath)
        const tokens = JSON.parse(file_contents)

        if (tokens) {
            this.auth.setCredentials(tokens)
        } else {
            throw new Error("No tokens set for Youtube OAuth")
        }
    }
}

module.exports = YoutubeAuth
