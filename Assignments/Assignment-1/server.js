'use strict';
var http = require('http');
var port = 1339;
const model = require('./models/album-model');

http.createServer(async function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   await model.initialize();
   const title = "KOD";
   const year = 2018;

   // Test if we can create the album and get an object from it
   const albumObject = await model.create(title, year);
   res.write(albumObject.title + " created successfully!\n");

   // Test if we can read it successfully, proving the create and reading to work
   const albums = await model.findByTitle(title);
   res.write(albums[0].title + " read successfully!\n");

   // Test if we can update the title
   const updateSuccess =  await model.update(title, "KOD by J Cole", year);
   res.write("Update operation resulted in " + updateSuccess.toString() + "\n");

   // Test if we can remove it from the database
   const deleteSuccess = await model.remove("KOD by J Cole", year);
   res.write("Delete operation resulted in " + deleteSuccess.toString() +"\n");
   

   res.end('\n');
}).listen(port);
