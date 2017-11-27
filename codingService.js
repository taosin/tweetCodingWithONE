/*
* @Author: iMocco
* @Date:   2017-11-27 10:36:44
* @Last Modified by:   iMocco
* @Last Modified time: 2017-11-27 14:19:23
*/

'use strict';
var http = require('http')
var AV = require('leanengine')
var url = require('url')
var https = require('https')
var querystring = require('querystring')
var cookie = require('cookie-parser')
var sid = 'c6eb845b-21cb-e3a3-17e6-ac626d84e68b'
var request = require('request')
var cheerio = require('cheerio')
var CronJob = require('cron').CronJob

var config = require('./config')
var _md5 = require('./md5.js')
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

	// 使用md5生成sid
	createSidWithMd5(str){
		var newStr = str || new Date().toString()
		var sid = _md5(newStr)
		var arr = []
		arr[0] = sid.substr(0,8)
		arr[1] = sid.substr(8,4)
		arr[2] = sid.substr(12,4)
		arr[3] = sid.substr(16,4)
		arr[4] = sid.substr(20,12)
		sid = arr.join('-')
	}

}
module.exports = new CodingService()