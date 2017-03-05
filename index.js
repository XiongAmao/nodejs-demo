var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 45888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query

  //从这里开始看，上面不要看

if(path === '/brendan_eich'){
  var htmlString = fs.readFileSync('./index.html') 
  response.end(htmlString)
}else if(path === '/index.css'){
  var cssString = fs.readFileSync('./index.css')
  response.setHeader('Content-Type','text/css;charset=utf-8')
  response.end(cssString)
}else if(path === '/firstweb.js'){
  var jsString = fs.readFileSync('./firstweb.js')
  response.setHeader('Content-Type','text/javascript')
  response.end(jsString)
}else{
  response.end('404')
}
//  switch(path){
//    case  '/index.html':
//      response.end("response：ok")		
//                        end 里面是设置消息体
//      break
//    default:
//      response.end('404')
//      break
//  }

  // 代码结束，下面不要看
})

server.listen(port)
console.log('监听 45888 成功')
