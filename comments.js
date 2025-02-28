// Create web server

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');

var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var url_parts = url.parse(request.url, true);

    if (url_parts.pathname == '/comment') {
        if (url_parts.query['comment'] != undefined) {
            comments.push(url_parts.query['comment']);
        }
    }

    if (url_parts.pathname == '/comments') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(comments.join('\n'));
    } else {
        fs.readFile('./index.html', function(err, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    }
});

// Listen on port 8000, IP defaults to