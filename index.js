var http = require('http');

var server = http.createServer();
server.on('request', function (request, response) {
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (request.method === 'GET' && request.url === '/hello') {
      response.write('<h1>Hello World!</h1>');
          response.end();
  } else {
          response.statusCode = 404;
          response.write('<h1>404: Zła ścieżka!</h1>');
          response.end();
  }
});


var WritableFileStream = require('writable-file-stream');

var f = WritableFileStream('./test.txt', {
    bufferSize: 1000
});

f.write('test');
f.write('test');
f.reopen(); // <- writes here
f.write('test');
f.write('test');
f.end(); // <- writes here

server.listen(8080);
