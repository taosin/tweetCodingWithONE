/*
* @Author: iMocco
* @Date:   2017-11-27 10:36:44
* @Last Modified by:   iMocco
* @Last Modified time: 2017-11-27 15:50:06
*/

'use strict';
var http = require('http')
var AV = require('leanengine')
var url = require('url')
var https = require('https')
var querystring = require('querystring')
var cookie = require('cookie-parser')
var sid = 'fb54a6bf-2af9-4ab7-9ccd-68ea3b1f919r'
var request = require('request')
var cheerio = require('cheerio')
var CronJob = require('cron').CronJob

var co = require('co')

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
	
	 // 定时登录发布冒泡
	 runAddTweet() {
	 	let self = this
	 	// 每天早上9:00更新一次
	 	var job = new CronJob('0 6 * * *', function () {
	 		self.addTweet()
	 	}, null, true, 'Asia/Chongqing')
	 }

	// 登录Coding
	loginCoding(){
		var self = this
		self.createSidWithMd5()
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
					self.addTweet()
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

	// 发布冒泡
	addTweet(){
		var self = this
		self.getTextFromONE().then(function (result) {
			var text = result
			var data = querystring.stringify({
				content: '#早安# ' + text + ' *---摘自「一个」*',
				location: '上海',
				device: self.getRandomDevice()
			});

			options.path = '/api/social/tweet'

			var reqq = https.request(options, function(ress) {
				ress.setEncoding('utf8');
				ress.on('data', function(chunk) {
					if(JSON.parse(chunk).code===1000){
						self.loginCoding()
					}
				});
				ress.on('end', function(chunk) {
					console.log("body: " + chunk);
				})
			});
			reqq.write(data);
			reqq.end();
		})

	}

	// 随机取出一个device
	getRandomDevice(){
		var devices = ['iPhone 6s Plus', 'iPhone 6s', 'iPhone 7', 'iPhone 7 Plus', 'iPhone 8 Plus', 'iPhone 8', 'iPhone se', 'iPhone x']
		var randomIndex = parseInt(Math.random() * 10)
		if(randomIndex > devices.length){
			return devices[2]
		}else{
			return devices[randomIndex]
		}
	}

	// 获取ONE中的句子
	getTextFromONE(){
		return new Promise(function(resolve, reject) {
			request('http://wufazhuce.com', function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(body);
					var text = $('.fp-one-cita a')[0].children[0].data
					resolve(text);
				}
			})
		}.bind(this))
	}

}
module.exports = new CodingService()