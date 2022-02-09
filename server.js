'use strict';
var http = require('http');
var port = 1339;
const model = require('./models/pokemonModel.js');
 
http.createServer(function (req, res) {
   res.writeHead(200, { 'Content-Type': 'text/plain' });
    
   res.end('Hello World\n');
}).listen(port);
