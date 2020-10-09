"use strict";

import express from "express"
import { body } from "express-validator"
import * as line from '@line/bot-sdk';
import validator from "validator"

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

const client = new line.Client(config);

export const middleware = line.middleware(config);

export const lineBot = (req, res, next) => {
  // 先にreturn code 200を返す
  res.status(200).end();

  const events = req.body.events;
  console.log("Body:" + JSON.stringify(req.body));
  console.log("\n");
  const promises = [];
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];

    promises.push(echoman(ev));
  }
  Promise.all(promises)
    .then(console.log("sent"))
    .catch((err) => console.log(err));
};

// 追加
async function echoman(ev) {
  let pro = null;
  try {
    pro = await client.getProfile(ev.source.userId);
  } catch (err) {
    console.log(err.name + ": " + err.message);
  }

  // undefinedの場合、空文字列を代入
  const message =
    typeof ev.message.text === "undefined" ? "" : ev.message.text;

  const txt =
    `ユーザID: ${ev.source.userId}\n` +
    `ユーザ名: ${pro == null ? "不明" : pro.displayName}\n` +
    `テキスト: ${message}\n` +
    `タイムスタンプ: ${ev.timestamp}`;

  console.log(txt);

  client.replyMessage(ev.replyToken,{type:'text', text: txt})

  return;
}
