const fs = require('fs');
const fsPromises = fs.promises;
/**
*  Read JSON data from given file and return it.
* 
* @param {any} filename
*/
async function readFromJsonFile(filename) {
   const rawText = await fsPromises.readFile(filename);
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
   await fsPromises.writeFile(filename, stringToWrite);
}
 
module.exports = {
   readFromJsonFile,
   writeToJsonFile
}
