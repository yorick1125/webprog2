const express = require('express');
const router = express.Router();
const routeRoot = '/';
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
    const pokemons = await model.listPokemon();
    const string = "";
}

async function findPokemonById(request, response){
    response.send(`find`);
}

async function updatePokemon(request, response){
    response.send(`update`);
}

async function removePokemon(request, response){
    response.send(`remove`);
}

module.exports = {
    router,
    routeRoot
}