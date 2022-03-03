'use strict';
var http = require('http');
var port = 1339;
const model = require('./models/album-model');

http.createServer(async function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   await model.initialize();
   const album = await model.createAlbum("KOD", 2018);
   

   res.end(album.name);
}).listen(port);
