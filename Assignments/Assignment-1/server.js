'use strict';
var http = require('http');
var port = 1339;
const model = require('./models/pokemonModelFileAsync.js');
const mysql = require('./models/pokemonModelMysql.js');

http.createServer(async function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   await mysql.initialize();
   const pokemon = await mysql.createPokemon("grovyle", "grass");
   

   res.end(pokemon.name);
}).listen(port);
