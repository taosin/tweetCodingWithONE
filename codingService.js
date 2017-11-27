/*
* @Author: iMocco
* @Date:   2017-11-27 10:36:44
* @Last Modified by:   iMocco
* @Last Modified time: 2017-11-27 13:19:24
*/

'use strict';
var http = require('http')
var AV = require('leanengine')
var url = require('url')
var https = require('https')
var querystring = require('querystring')
var cookie = require('cookie-parser')
var sid = '27e26bd9-0715-47ac-8f18-9e941c766eeb'
var request = require('request')
var cheerio = require('cheerio')
var CronJob = require('cron').CronJob

var config = require('./config')
var host = 'coding.net'
var options = {
	host: host,
	path: '',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Cookie': 'sid=' + sid
	}
}
class CodingService {
	
	// 登录Coding
	loginCoding(){
		var self = this
		var data = querystring.stringify({
			account: config.username,
			password: config.password
		})
		options.path = '/api/v2/account/login'

		var req = https.request(options, function(res) {
			res.setEncoding('utf8')
			res.on('data', function(chunk) {
				var result = JSON.parse(chunk)
				if (result.code === 0) {
					console.log('success')
				}else{
					console.log(chunk);
				}
			});
			res.on('end', function(chunk) {
				console.log("end:--------")
			})
		})
		req.write(data)
		req.end()
	}
}
module.exports = new CodingService()