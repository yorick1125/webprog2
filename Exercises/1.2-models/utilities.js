const fs = require('fs');
 
/**
 
*  Read JSON data from given file and return it.
* 
* @param {any} filename
*/
async function readFromJsonFile(filename) {
   const rawText = fs.readFileAsync(filename);
   const parsedJson = JSON.parse(rawText.toString());
   return parsedJson;
}
 
/**
*  Write the given data to the given file in Json format.
* @param {any} filename
* @param {any} data
*/
async function writeToJsonFile(filename, data) {
   const stringToWrite = JSON.stringify(data);
   fs.writeFileAsync(filename, stringToWrite);
}
 
module.exports = {
   readFromJsonFile,
   writeToJsonFile
}
