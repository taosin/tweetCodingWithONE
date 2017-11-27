/*
* @Author: iMocco
* @Date:   2017-11-27 10:36:44
* @Last Modified by:   iMocco
* @Last Modified time: 2017-11-27 10:37:44
*/

'use strict';
var http = require('http');
var AV = require('leanengine')
var url = require('url')
var https = require('https');
var querystring = require('querystring');
var cookie = require('cookie-parser');
var sid = '';
var request = require('request');
var cheerio = require('cheerio');
var CronJob = require('cron').CronJob
class CodingService {

}
module.exports = new CodingService()