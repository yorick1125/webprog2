// CONSTANTS
// __________________________________________________________________________________________________________
const utilities = require('../utilities.js');
const filename = "./data/pokemonDatabase.json";
const validateUtils = require('./validateUtils.js');

// CRUD OPERATIONS
// __________________________________________________________________________________________________________

async function addPokemon(name, type){
    if(!validateUtils.isValid1(name, type)){
        return null;
    }

    // check if pokemon already exists to fix duplicate entries
    const test = await findByName(name);
    if(test != null){
        return test;
    }

    let data = await utilities.readFromJsonFile(filename);
    const pokemon = {"name": name, "type": type};

    data.push(pokemon);
    await utilities.writeToJsonFile(filename, data);
    return pokemon;
}

async function findByName(name){
    if(!validateUtils.isValid2(name)){
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



module.exports = {
    addPokemon,
    findByName,
    replacePokemon,
    deletePokemon
}