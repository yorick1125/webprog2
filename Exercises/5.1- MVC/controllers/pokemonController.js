const express = require('express');
const router = express.Router();
const routeRoot = '/';
const model = require('../models/pokemonModelMysql')


router.post('/pokemon', newPokemon);
router.get('/pokemon', showPokemon);
router.get('/all', listPokemon);


async function newPokemon(request, response){
    const name = request.body.name;
    const type = request.body.type;

    console.log(name);
    console.log(type);

    try{
        const pokemon = await model.createPokemon(name, type);
        const message = `Pokemon ${pokemon.name} of type ${pokemon.type} was created successfully! `;
        const showPageData = {
            message: message,
        }

        response.render("show.hbs", showPageData)
    }
    catch(error){
        if(error instanceof model.InvalidInputError){
            const errorPageData = {
                heading: "400 - InvalidInputError",
                message: error.message
            }

            response.render('error.hbs', errorPageData)
        }
        else if(error instanceof model.DatabaseExecutionError){
            const errorPageData = {
                heading: "500 - DatabaseExecutionError-500",
                message: error.message
            }

            response.render('error.hbs', errorPageData)
        }
        else{
            console.error(error.message);
            throw error;
        }
    }



}


async function showPokemon(request, response){
    const name = request.query.name;

    const pokemon = await model.findByName(name);


    const showPageData = {
        heading: name,
        pokemon: pokemon
    }
    response.render('show.hbs', showPageData)
}

async function listPokemon(request, response){
    const pokemons = await model.findAll();

    const listPageData = {
        heading: "Here is a list of all pokemon",
        pokemons: pokemons
    }
    response.render('list.hbs', listPageData);
}

module.exports = {
    router,
    routeRoot
}