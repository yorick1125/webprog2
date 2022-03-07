var http = require('http');
var port = 1338;
var controller = require('./controllers/simpleController')

http.createServer(handleHttpRequest).listen(port);

function handleHttpRequest(request, response){
    controller.handle(request.method, request.url, response);
}

