const utilities = require('../utilities.js');
const filename = "../data/pokemonDatabase.json";

function addPokemon(n, t){
    const name = n;
    const type = t;
    validateNameNType(name, type);
    utilities.writeToJsonFile(filename, db);
}

function validateNameNType(name, type){

}

module.exports = {
    addPokemon
 }