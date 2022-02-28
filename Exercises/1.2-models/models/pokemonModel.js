// CONSTANTS
// __________________________________________________________________________________________________________
const utilities = require('../utilities.js');
const filename = "./data/pokemonDatabase.json";
const validTypes = ["normal", "grass", "fire", "water", "electric", "psychic"]
const validator = require('validator');

// CRUD OPERATIONS
// __________________________________________________________________________________________________________
/***
 * 
 */

async function addPokemon(name, type){
    if(!isValid1(name, type)){
        return null;
    }
    
    const pokemon = [{"name": name, "type": type}];
    await utilities.writeToJsonFile(filename, pokemon);
    return pokemon;
}

async function findByName(name){
    if(isValid2(name, "normal")){
        return null;
    }

    const pokemonData = await utilities.readFromJsonFile(filename);
    const foundMatch = pokemonData.find(
        (pokemon) => {return pokemon.name == name}
    );

    if(foundMatch){
        return foundMatch;
    }
    else{
        return null;
    }

}

async function replacePokemon(originalName, newName, newType){
    const data = await utilities.readFromJsonFile(filename);
    let found = false;
    data.forEach((pokemon) => {
        if(pokemon != null && pokemon.name == originalName){
            pokemon.name = newName;
            pokemon.type = newType;
            found = true;
        }
    })
    if(found){
        await utilities.writeToJsonFile(filename, data);
        return true;
    }
    return false;

}

async function deletePokemon(name){
    const data = await utilities.readFromJsonFile(filename);
    if(findByName(name) == null){
        return false;
    }

    let index = 0;
    let indexToSplice = 0;
    data.forEach((pokemon) => {
        if(pokemon.name == name){
            indexToSplice = index;
        }
        index++;
    })

    data.splice(indexToSplice, 1);
    await utilities.writeToJsonFile(filename, data);
    return true;
}

// INPUT VALIDATION
// __________________________________________________________________________________________________________


function isValid1(name, type){ 
    // Check for valid type
    if(!validTypes.includes(type)){
        return false;
    }

    // Check for valid name
    if(typeof name === "string"){
        if (name){
            return true;
        }
        else {
            return false;
        }
    }
}


function isValid2(name, type){
    validator.isAlpha(name);
}


module.exports = {
    addPokemon,
    findByName,
    replacePokemon,
    deletePokemon
}