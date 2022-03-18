const app = require('../app');
const supertest = require("supertest");
const testRequest = supertest(app);

/* Data to be used to generate random album for testing */
const albumData = [
{ title: 'Die Lit', year: 2018},
{ title: 'Thriller', year: 1982 },
{ title: 'Donda', year: 2021 },
{ title: 'Forest Hill Drives', year: 2014},
{ title: 'Psychodrama', year: 2019 },
{ title: 'Meet The Woo 2', year: 2020 },
{ title: 'Savage Mode 2', year: 2020 },
{ title: 'A Love Letter To You 3', year: 2018 },
{ title: 'Culture', year: 2017 },
]

/** Since a Album can only be added to the DB once, we have to splice from the array. */
//const generateAlbumData = () => albumData.splice(Math.floor((Math.random() * albumData.length)), 1)[0];

// Slice version - Allows many tests without ever "running out" of generated pokemon
const generatePokemonData = () => {
    const index = Math.floor((Math.random() * pokemonData.length));
    return pokemonData.slice(index, index+1)[0];
}

// Initialize database before proceeding
const dbName = "music_db_test";
const model = require('../models/album-model');
const { test, expect } = require('@jest/globals');

/* Make sure the database is empty before each test.  This runs before each test.  See https://jestjs.io/docs/api */
beforeEach(async () => {
    try {
        await model.initialize(dbName, true);
     } 
    catch (err) {
        console.error(err);
    }
});

// CREATE
test.only("POST /album success case", async () => {
    const { Title, Year } = generateAlbumData();
    const testResponse = await testRequest.post('/album/new').send({
        title: Title,
        year: Year
    })
    console.log(testResponse)
    expect(testResponse.status).toBe(200);
});
    

// READ
test("GET /album success case", async () => {
    const testResponse = await testRequest.get('/album/all');
    expect(testResponse.status).toBe(200);
});
    
test("GET /album success case", async () => {
    const testResponse = await testRequest.get('/album/all');
    expect(testResponse.status).toBe(200);
});

// UPDATE
test("PUT /album success case", async () => {
    const testResponse = await testRequest.get('/album/all');
    expect(testResponse.status).toBe(200);
});


// DELETE
test("DELETE /album success case", async () => {
    const testResponse = await testRequest.get('/album/all');
    expect(testResponse.status).toBe(200);
});



afterEach(async () => {
    model.endConnection();
})