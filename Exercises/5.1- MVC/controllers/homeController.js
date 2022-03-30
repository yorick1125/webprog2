const express = require('express');
const router = express.Router();
const routeRoot = '/';
const model = require('../models/pokemonModelMysql')
router.get('/home', showHomepage)

function showHomepage(request, response){
    const homePageData = {
        heading: "Home",
        content: "Welcome to our homepage"
    }
    response.render('home.hbs', homePageData)
}

router.post('/new', newPokemon)



async function newPokemon(request, response){
    const name = request.query.name;
    const type = request.query.type;

    const pokemon = await model.createPokemon(name, type)

    response.send(`Pokemon ${pokemon.name} of type ${pokemon.type} was created successfully! `);
}
module.exports = {
    router,
    routeRoot
}