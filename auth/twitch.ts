/**
 * TwitchAuth is a simple auth data object
 */
export class TwitchAuth {

  oauthToken: string
  botUsername: string
  channel: string

  constructor(
    { oauthToken, botUsername, channel }: {
      oauthToken: string,
      botUsername: string,
      channel: string,
    }
  ) {
    this.oauthToken = oauthToken
    this.botUsername = botUsername
    this.channel = channel
  }
}

