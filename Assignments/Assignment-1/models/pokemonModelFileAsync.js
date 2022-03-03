// CONSTANTS
// __________________________________________________________________________________________________________
const utilities = require('../utilities.js');
const validateUtils = require('./validateUtils.js');
const utilsAsync = require('../utilitiesAsync.js');
let db;
// CRUD OPERATIONS
// __________________________________________________________________________________________________________

async function initialize(dbFilename, resetFlag) {
    db = dbFilename;

    if (resetFlag) {
        await utilsAsync.writeToJsonFile(db, []);
        console.log("Model successfully initialized. File reset.");
    } 

    else {
        try {
            const pokemonData = await utilsAsync.readFromJsonFile(db);
            if (pokemonData) {
                console.log("Model successfully initialized. File unchanged.");
            }
        } 
        catch (error){
            await utilsAsync.writeToJsonFile(db, []);
            console.log("Model successfully initialized. File reset due to error.");
        }
    }
}

async function addPokemon(name, type){
    if(!validateUtils.isValid(name, type)){
        throw new InvalidInputError();
    }

    // check if pokemon already exists to fix duplicate entries
    const test = await findByName(name);
    if(test != null){
        return test;
    }

    let data = await utilsAsync.readFromJsonFile(filename);
    const pokemon = {"name": name, "type": type};

    data.push(pokemon);
    await utilsAsync.writeToJsonFile(filename, data);
    return pokemon;
}

async function findByName(name){
    if(!validateUtils.isValid(name)){
        return null;
    }

    const pokemonData = await utilsAsync.readFromJsonFile(filename);
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
    const data = await utilsAsync.readFromJsonFile(filename);
    let found = false;
    data.forEach((pokemon) => {
        if(pokemon != null && pokemon.name == originalName){
            pokemon.name = newName;
            pokemon.type = newType;
            found = true;
        }
    })
    if(found){
        await utilsAsync.writeToJsonFile(filename, data);
        return true;
    }
    return false;

}

async function deletePokemon(name){
    const data = await utilsAsync.readFromJsonFile(filename);
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
    await utilsAsync.writeToJsonFile(filename, data);
    return true;
}

// ERROR HANDLING
// __________________________________________________________________________________________________________
class InvalidInputError extends Error {

}

class InvalidFileError extends Error {

}

module.exports = {
    addPokemon,
    findByName,
    replacePokemon,
    deletePokemon,
    InvalidInputError,
    InvalidFileError
}