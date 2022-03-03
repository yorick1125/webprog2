const model = require('../models/album-model');

/* Data to be used to generate random album for testing */
const albumData = [
{ name: 'Die Lit', year: 2018},
{ name: 'Thriller', year: 1982 },
{ name: 'Donda', year: 2021 },
{ name: 'Forest Hill Drives', year: 2014},
{ name: 'Psychodrama', year: 2019 },
{ name: 'Astroworld', year: 2018 }
]

/** Since a Album can only be added to the DB once, we have to splice from the array. */
const generateAlbumData = () => albumData.splice(Math.floor((Math.random() * albumData.length)), 1)[0];

// Initialize database before proceeding


/* Make sure the database is empty before each test.  This runs before each test.  See https://jestjs.io/docs/api */
beforeEach(async () => {
    try {
        await model.initialize();
        await model.truncate("album");
     } 
    catch (err) {
        console.error(err);
    }
});

// CREATE
test('Album was created successfully.', async () => {
	const { name, year } = generateAlbumData();
	const album = await model.create(name, year);

    expect(album).toBeInstanceOf(Object);
    expect(album.name).toBe(name);
    expect(album.year).toBe(year);
});

test('Album was not created with an empty string.', async () => {
	const album = await model.create(name, year);

    expect(album).toBeInstanceOf(Object);
    expect(album.name).toBe(name);
    expect(album.year).toBe(year);
});

// READ
test('Can find album by name from DB', async () => {
    // Create new album and add to database
	const { name, year } = generateAlbumData();
	await model.create(name, year);


    // Get an array of all albums and see if we can find the created album with correct fields
	const albums = await model.findByName(name);
    console.log(albums);

    expect(Array.isArray(albums)).toBe(true);
    expect(albums[0].name).toBe(name);
    expect(albums[0].year).toBe(year);
});

// UPDATE
test('Can update album from DB', async () => {
    // Create new album and add to database
	const { name, year } = generateAlbumData();
	await model.create(name, year);

    // Update album with new properties
    const newName = "New Album Name";
    const newYear = year - 2;
    const success = await model.update(name, newName, newYear);

    // Find the album with its new name to verify that it was properly updated
    const albums = await model.findByName(newName);

    expect(success).toBe(true);
    expect(albums[0]).toBeInstanceOf(Object);
    expect(albums[0].name).toBe(newName);
    expect(albums[0].year).toBe(newYear);
});


// DELETE
test('Album was removed successfully.', async () => {
    // Create new album and add to database
	const { name, year } = generateAlbumData();
	await model.create(name, year);

    const success = await model.remove(name, year);
    expect(success).toBe(true);
});



afterEach(async () => {
    model.endConnection();
})