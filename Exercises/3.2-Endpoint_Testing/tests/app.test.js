const app = require("../app")
const supertest = require("supertest");
const testRequest = supertest(app);


const model = require('../models/pokemonModelMysql')
const dbName = 'pokemon_db_test';
/* Data to be used to generate random pokemon for testing */
const pokemonData = [
    { name: 'Bulbasaur', type: 'grass' },
    { name: 'Charmander', type: 'fire' },
    { name: 'Squirtle', type: 'water' },
    { name: 'Pikachu', type: 'electric' },
    { name: 'Pidgeotto', type: 'flying' },
    { name: 'Koffing', type: 'poison' }
    ]
    
/** Splice version: Ensures a Pokemon can only be added to the DB once. */
// const generatePokemonData = () => pokemonData.splice(Math.floor((Math.random() * pokemonData.length)), 1)[0];

// Slice version - Allows many tests without ever "running out" of generated pokemon
const generatePokemonData = () => {
    const index = Math.floor((Math.random() * pokemonData.length));
    return pokemonData.slice(index, index+1)[0];
}

/* Make sure the database is empty before each test.  This runs before each test.  See https://jestjs.io/docs/api */
beforeEach(async () => {
    try {
        await model.initialize(dbName, true);
        } catch (err) {}
});

test("GET /pokemon success case", async () => {
    const testResponse = await testRequest.get('/pokemon?name=eevee');
    expect(testResponse.status).toBe(200);
});
    

afterEach(async () => {
    const connection = model.getConnection();
    if(connection){
        connection.end();
    }
})