var http = require('http');
var fs = require('fs');
var mime = require('mime-types');

function getFilename(url) {
   if (url)
   {
      var m = url.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1)
      {
         return m[1] + '.' + url.split('.').pop();
      }
   }
   return "";
}

function getFileByName(name, response) {
  fs.readFile(name, function (err, data) {
      response.setHeader("Content-Type", mime.lookup(name));
      if (err) throw err;
      response.write(data);
      response.end();
  });
}



var server = http.createServer();
server.on('request', function (request, response) {

    if (request.method === 'GET' && request.url === '/') {
      getFileByName('./index.html', response);
    } else {
      var fileName = getFilename(request.url)

      fs.exists('files/' + fileName, function (exists) {
        if (exists) {
          getFileByName('files/' + fileName, response);
        } else {
          response.statusCode = 404;
          fs.readFile('./404.jpg', function (err, data) {
            response.setHeader("Content-Type", "image/jpeg");
            response.write(data);
            response.end();
          });
        }
      });
    }
});

server.listen(9000);
