'use strict';
var http = require('http');
var port = 1339;
const model = require('./models/pokemonModelFileAsync.js');
const utilities = require('./utilities.js');
const dbFilename = "./data/pokemonDatabase.json";

http.createServer(async function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   const pokemon = await model.findByName("grovyle");
   res.end(pokemon.type);
}).listen(port);
