var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 45888;

var server = http.createServer(function (request, response) {

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query

  //从这里开始看，上面不要看
  if (request.method === 'GET'){
    if (path === '')

  }
  if (path === '/') {
    var htmlString = fs.readFileSync('./index.html')
    response.end(htmlString)
  } else if (path === '/index.css') {
    var cssString = fs.readFileSync('./index.css')
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.end(cssString)
  } else if (path === '/main.js') {
    var jsString = fs.readFileSync('./main.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(jsString)
  } else {
    response.end('404')
  }

})

server.listen(port)
console.log('监听 45888 成功')
