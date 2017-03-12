#!/usr/bin/env node  

var http = require('http');
var fs = require('fs');
var url = require('url')
var express=require('express');

//console.log(Object.keys(http))
var port = process.env.PORT || 45999;

var server = http.createServer(function (request, response) {

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query

  //从这里开始看，上面不要看
  if (request.method === 'GET'){
    if (path === '/') {
      var string = fs.readFileSync('./a.html') //读取文件路径
      response.setHeader('Content-type','text/html;charset=utf-8') //响应头 Content-type
      response.end(string)  // 响应消息体
    }else if(path === '/b'){
      var string = fs.readFileSync('./b.html') //读取文件路径
      response.setHeader('Content-type','text/html;charset=utf-8') //响应头 Content-type
      response.end(string)  // 响应消息体
    }else{
      response.end('404')
    }
  }else if (request.method === 'POST'){ //如果请求是POST
    if (path === '/'){
      var payload = "";
      request.addListener("data",function(chunk){
        payload += chunk;
      })
    }
  }
  // if (path === '/') {
  //   var htmlString = fs.readFileSync('./index.html')
  //   response.end(htmlString)
  // } else if (path === '/index.css') {
  //   var cssString = fs.readFileSync('./index.css')
  //   response.setHeader('Content-Type', 'text/css;charset=utf-8')
  //   response.end(cssString)
  // } else if (path === '/main.js') {
  //   var jsString = fs.readFileSync('./main.js')
  //   response.setHeader('Content-Type', 'application/javascript')
  //   response.end(jsString)
  // } else {
  //   response.end('404')
  // }

})

server.listen(port)
console.log('监听 45999 成功')
