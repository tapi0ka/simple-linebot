import 'reflect-metadata'
import { injectAll, singleton, injectable, container, autoInjectable } from 'tsyringe'

import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import dotenv from 'dotenv'
dotenv.config()

import indexRouter from './routes/index'
import lineRouter from './routes/line'

// const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(compression({level: 6}));

// viewディレクトリのテンプレート読み込み
// テンプレートエンジンはpug
app.set('views', path.join(__dirname, 'views'))
app.set(`view engine`, `pug`)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', indexRouter)
app.use('/line', lineRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
