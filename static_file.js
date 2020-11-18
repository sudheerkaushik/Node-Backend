var http = require("http"),
fs = require('fs');

function serverStaticFile(res, path, contentType, responseCode)
{
    if(!responseCode) responseCode=200;
    fs.readFile(__dirname+path , function(err, data){
        if(err)
        {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - Internal server error');
        }
        else 
        {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    })
}

http
  .createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
      case "/home":
        serverStaticFile(res, '/public/home.html', 'text/html');
        break;
      case "/about":
        serverStaticFile(res, '/public/about.html', 'text/html');
        break;
        case "/logo":
        serverStaticFile(res, '/public/image/logo.png', 'image/png');
        break;
      default:
        serverStaticFile(res, '/public/404.html', 'text/html', 404);
        break;
    }
  })
  .listen(3000);
console.log("Server started on localhost:3000; press Ctrl-C to terminate....");
