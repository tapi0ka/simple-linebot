# サンプル LINE Bot

勉強会用に作ったサンプルプロジェクト。<br>

## 機能(Feature)

* オウム返し機能
* 簡易匿名掲示板機能
* 住所検索機能

## 必要要件(Require)

* NPM(Node Package Manager)
* インターネットが繋がる環境
* VS Code
* LINE Developers

## インストール方法(Installing)

### Githubからソースを落とす

```bash
git clone https://github.com/microsoft/TypeScript.git
```

### パッケージインストール

NPMコマンドを使って開発に必要なパッケージをダウンロードします。<br>
いやぁ、超便利ですわね(・∀・)

```bash
npm i
```

### ngrokをダウンロード

ngrokはローカルで動かしているサーバを超簡単に外部に公開できるやばいアプリです。<br>
公開するポートを指定できるものの、<br>
気を抜くと普通にハッキングされそうなので気をつけて使いましょう。<br>
アカウントの作成が必要だと思います。

→[ngrok](https://dashboard.ngrok.com/signup)

### LINE DevelopersにてLINE Bot API取得

[LINE Developer](https://developers.line.biz/console/register/messaging-api/provider/)にてLINE Botアカウント作成

気合でLINE Botを作成し、Channel access tokenを取得

## 動かし方


## 参考にさせていただいたリポジトリ

[bulletproof-nodejs](https://github.com/santiq/bulletproof-nodejs)