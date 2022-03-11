const express = require('express');
const router = express.Router();
const routeRoot = '/pokemon';
const model = require('../models/pokemonModelMysql')


router.post('/new', newPokemon)
router.get('/all', listPokemon)
router.get('/pokemon', findPokemonById)


async function newPokemon(request, response){
    const name = request.query.name;
    const type = request.query.type;

    const pokemon = await model.createPokemon(name, type)

    response.send(`Pokemon ${pokemon.name} of type ${pokemon.type} was created successfully! `);
}

async function listPokemon(request, response){

}

async function findPokemonById(request, response){

}

async function updatePokemon(request, response){

}

async function removePokemon(request, response){

}

module.exports = {
    router,
    routeRoot
}