/*
* @Author: iMocco
* @Date:   2017-11-27 10:35:16
* @Last Modified by:   iMocco
* @Last Modified time: 2017-11-27 14:39:25
*/

'use strict'
var express = require('express')
var powerexpress = require('power-express')(express)
var app = powerexpress()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
var Server = require('./server')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var codingService = require('./codingService')
    codingService.addTweet()
    // codingService.runLikePop()
app.use(express.static(__dirname + '/public/'))
var appServer = new Server(app)
appServer.start()