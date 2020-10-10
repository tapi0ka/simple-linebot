import axios from 'axios'
import * as line from '@line/bot-sdk'

export interface ResponseInterface {
  execResponse(): void
  getInfo(): String
}

/**
 * 受け取ったメッセージのタイプ、内容に応じてインスタンスを返す
 */
export class ReceiveMessageFactory {
  /** 検証用ユーザID */
  static readonly VERIFICATION_USER_ID: String = 'Udeadbeefdeadbeefdeadbeefdeadbeef'

  private client: any
  constructor(client: any) {
    this.client = client
  }

  public init(event: any): ResponseInterface {
    const type = event.type
    const text = event?.message?.text
    const replyToken = event.replyToken
    const userId = event.source.userId

    switch (type) {
      case 'follow':
        return new FollowResponse(this.client, replyToken)
      case 'unfollow':
        return new UnFollowResponse()
      case 'message':
        break
    }

    if (ReceiveMessageFactory.VERIFICATION_USER_ID === userId) {
      return new VerificationResponse()
    }

    if (this.isPostalCode(text)) {
      return new PostalInfoReply(text, replyToken, this.client)
    }

    return new UnknownResponse(this.client, replyToken, event)
  }

  /**
   * 郵便番号であるか確認
   * @param text
   */
  private isPostalCode(text: string): Boolean {
    if (/^[0-9]{3}-[0-9]{4}$/.test(text)) {
      return true
    }
    if (/^[0-9]{7}$/.test(text)) {
      return true
    }
    return false
  }
}

/**
 * 郵便番号の住所を返信する
 */
class PostalInfoReply implements ResponseInterface {
  private postalCode: String
  private replyToken: String
  private apiInstance: any
  private client: line.Client

  constructor(code: String, replyToken: String, client: any) {
    this.postalCode = code
    this.replyToken = replyToken
    this.apiInstance = axios.create({
      baseURL: 'https://zipcloud.ibsnet.co.jp',
      timeout: 5000,
    })
    this.client = client
  }

  execResponse(): void {
    this.apiInstance
      .get('/api/search', {
        params: {
          zipcode: this.postalCode,
        },
      })
      .then(res => {
        this.client.replyMessage(this.replyToken.valueOf(), { type: 'text', text: this.addrToString(res) })
      })
      .catch(err => {
        console.log('err:', err)
      })
  }

  private addrToString(res): string {
    return (
      `住所は、\n` +
      res.data.results[0].address1 +
      res.data.results[0].address2 +
      res.data.results[0].address3 +
      `\nになります！`
    )
  }

  getInfo(): String {
    throw new Error('Method not implemented.')
  }
}

class UnknownResponse implements ResponseInterface {
  private client: line.Client
  private replyToken: String
  private event: any

  constructor(client, replyToken, event) {
    this.client = client
    this.replyToken = replyToken
    this.event = event
  }

  execResponse(): void {
    console.log('不明な文面が返ってきました')
    console.log('イベント内容\n')
    console.log(this.event)

    const text = this?.event?.message?.text

    if (!!text) {
      this.client.replyMessage(this.replyToken.valueOf(), { type: 'text', text: text })
    }
  }
  getInfo(): String {
    throw new Error('Method not implemented.')
  }
}

class FollowResponse implements ResponseInterface {
  private client: line.Client
  private replyToken: String

  constructor(client, replyToken) {
    this.client = client
    this.replyToken = replyToken
  }

  execResponse(): void {
    this.client.replyMessage(this.replyToken.valueOf(), { type: 'text', text: this.createWelcomeMessage() })
  }

  private createWelcomeMessage(): string {
    return `フォローしてくれてありがとう！\n鳳えむだよ！\nプロジェクトセカイ超楽しいから一緒にやろーうっ\nわんだほーい！！！`
  }

  getInfo(): String {
    throw new Error('Method not implemented.')
  }
}

class UnFollowResponse implements ResponseInterface {
  execResponse(): void {
    console.log('フォロー解除、またはブロックされました')
  }
  getInfo(): String {
    throw new Error('Method not implemented.')
  }
}

class VerificationResponse implements ResponseInterface {
  execResponse(): void {
    console.log('LINE Depeloperから検証が行われました')
  }
  getInfo(): String {
    throw new Error('Method not implemented.')
  }
}
