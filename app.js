#!/usr/bin/env node

var http = require('http');
var path = require('path');
var multer = require('multer');
var express = require('express');

// 创建APP
var app = express();

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 45999);


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);


// GET方法访问默认路径，返回/uploadFile.html文件
app.get('/', function(request, response){
    response.sendfile(__dirname+'/'+'uploadFile.html');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })



// 调用实例方法listen，监听设定好的端口 45999
app.listen(app.get('port'));
console.log('listen port 45999 ，Server start')