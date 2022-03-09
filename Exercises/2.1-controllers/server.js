var http = require('http');
var port = 1339;
var controller = require('./controllers/simpleController')
const url = require('url').URL;


http.createServer(handleHttpRequest).listen(port);

function handleHttpRequest(request, response){
    const fullUrl = new URL(request.url, `http://${request.headers.host}`); 
    const endPoint = fullUrl.pathname;


    controller.handle(request, response, endPoint);
}

