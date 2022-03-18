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
const generateAlbumData = () => {
    const index = Math.floor((Math.random() * albumData.length));
    return albumData.slice(index, index+1)[0];
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
test("POST /album success case", async () => {
    // Create Album
    const { title, year } = generateAlbumData();
    const testResponse = await testRequest.post('/album/new').send({
        title: title,
        year: year
    })

    expect(testResponse.status).toBe(200);
    expect(testResponse.text).toBe(`Album ${title} released in ${year} was created successfully! `)
});

test("POST /album fail case with blank title", async () => {
    // Create Album
    const { title, year } = generateAlbumData();
    const testResponse = await testRequest.post('/album/new').send({
        title: "",
        year: year
    })

    expect(testResponse.status).toBe(404);
    expect(testResponse.text).toBe('Could not create Album.')
});

test("POST /album fail case with invalid year", async () => {
    // Create Album
    const { title, year } = generateAlbumData();
    const testResponse = await testRequest.post('/album/new').send({
        title: title,
        year: 3000
    })

    expect(testResponse.status).toBe(404);
    expect(testResponse.text).toBe('Could not create Album.')});
    

// READ
test("GET /album full list of albums", async () => {
    // Fill db with list of albums
    await testRequest.post('/album/new').send({
        title: "title1",
        year: 2001
    });

    await testRequest.post('/album/new').send({
        title: "title2",
        year: 2002
    });

    await testRequest.post('/album/new').send({
        title: "title3",
        year: 2003
    });



    const testResponse = await testRequest.get('/album/all');
    expect(testResponse.status).toBe(200);
});
    
test("GET /album success case", async () => {
    // Create Album
    const { title, year } = generateAlbumData();
    await testRequest.post('/album/new').send({
        title: title,
        year: year
    });

    // Find Previously Created Album
    const testResponse = await testRequest.get(`/album/find?title=${title}`);


    expect(testResponse.status).toBe(200);
    expect(testResponse.text).toBe(`Album ${title} was found successfully! `)


});

// UPDATE
test("PUT /album success case", async () => {
    // Create new Album to test edit
    const { title, year } = generateAlbumData();
    await testRequest.post('/album/new').send({
        title: title,
        year: year
    })

    // Edit with new title
    const newTitle = "New Title";
    const newYear = year - 2;

    const testResponse = await testRequest.put('/album/edit').send({
        title: title,
        newTitle: newTitle,
        newYear: newYear
    });
    
    expect(testResponse.status).toBe(200);
    expect(testResponse.text).toBe(`Album ${title} was updated successfully with new title: ${newTitle} and new year: ${newYear}. `);
});


test("PUT /album fail case", async () => {
    // Create new Album to test edit
    const { title, year } = generateAlbumData();
    await testRequest.post('/album/new').send({
        title: title,
        year: year
    })

    // Edit with invalid new title
    const newTitle = "";
    const newYear = year - 2;

    const testResponse = await testRequest.put('/album/edit').send({
        title: title,
        newTitle: newTitle,
        newYear: newYear
    });
    
    expect(testResponse.status).toBe(404);
    expect(testResponse.text).toBe('Could not edit album. ');
});

test("PUT /album fail case", async () => {
    // Create new Album to test edit
    const { title, year } = generateAlbumData();
    await testRequest.post('/album/new').send({
        title: title,
        year: year
    })

    // Edit with invalid new title
    const newTitle = "New Title";
    const newYear = 3000;

    const testResponse = await testRequest.put('/album/edit').send({
        title: title,
        newTitle: newTitle,
        newYear: newYear
    });
    
    expect(testResponse.status).toBe(404);
    expect(testResponse.text).toBe('Could not edit album. ');
});



// DELETE
test("DELETE /album success case", async () => {
    // Create new Album to test remove
    const { title, year } = generateAlbumData();
    await testRequest.post('/album/new').send({
        title: title,
        year: year
    })

    // Remove created album
    const testResponse = await testRequest.delete('/album/remove').send({
        title: title,
        year: year
    });

    expect(testResponse.status).toBe(200);
    expect(testResponse.text).toBe(`Album ${title} was removed successfully!`);
});




afterEach(async () => {
    model.endConnection();
})