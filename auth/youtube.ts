import { google } from 'googleapis'
import { OAuth2Client, Credentials } from 'google-auth-library'

const file = require("../util/file")

const OAuth2 = google.auth.OAuth2

// Permissions needed to view and submit live chat comments
const DEFAULT_SCOPE = [
	"https://www.googleapis.com/auth/youtube.readonly",
	"https://www.googleapis.com/auth/youtube",
	"https://www.googleapis.com/auth/youtube.force-ssl"
]

export class YoutubeAuth {

	auth: OAuth2Client
	scope: string[]

	// save token in this path
	tokenFilePath: string

	constructor({
		clientId,
		clientSecret,
		redirectURI,
		tokenFilePath,
		scope = DEFAULT_SCOPE,
	}: {
		clientId: string,
		clientSecret: string,
		redirectURI: string,
		tokenFilePath: string,
		scope: string[],
	}) {

		this.auth = new OAuth2(clientId, clientSecret, redirectURI)
		this.auth.on("tokens", this.saveTokens.bind(this))

		this.scope = scope
		this.tokenFilePath = tokenFilePath
	}

	getAuth() {
		return this.auth
	}

	/**
	 * save tokens to local file
	 * @param {*} tokens 
	 */
	saveTokens(tokens: Credentials) {
		if (tokens.refresh_token) {
			file.save(this.tokenFilePath, JSON.stringify(tokens))
		}
	}

	/**
	 * express getCode will redirect to google OAuth page.
	 * may use a express Response instance to redirect to the auth page
	 * @param {*} response to open the url
	 */
	getCode(response: { redirect: (url: string) => void }) {
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
	async getTokensWithCode(code: string) {
		const credentials = await this.auth.getToken(code)
		await this.authorize(credentials)
	}

	async authorize({ tokens }: { tokens: Credentials }) {
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
