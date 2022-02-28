const model = require('../models/pokemonModel');
const utils = require('../utilities');
const db = '../data/pokemonDatabase.json'; // Since this will be used by utilities.js, need '.', not '..’

/* Data to be used to generate random pokemon for testing */
const pokemonData = [
{ name: 'Bulbasaur', type: 'Grass' },
{ name: 'Charmander', type: 'Fire' },
{ name: 'Squirtle', type: 'Water' },
{ name: 'Pikachu', type: 'Lightning' },
{ name: 'Pidgeotto', type: 'Flying' },
{ name: 'Koffing', type: 'Poison' }
]

/** Since a Pokemon can only be added to the DB once, we have to splice from the array. */
const generatePokemonData = () => pokemonData.splice(Math.floor((Math.random() * pokemonData.length)), 1)[0];

/* Make sure the database is empty before each test.  This runs before each test.  See https://jestjs.io/docs/api */
beforeEach(async () => {
    try {
        utils.writeToJsonFile(db, []);
     } catch (err) {}
});