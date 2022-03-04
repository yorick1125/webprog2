const model = require('../models/album-model');

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
	const { title, year } = generateAlbumData();
	const album = await model.create(title, year);

    expect(album).toBeInstanceOf(Object);
    expect(album.title).toBe(title);
    expect(album.year).toBe(year);
});

test('Album was not created with blank string.', async () => {
	const { title, year } = generateAlbumData();
	const album = await model.create("", year);

    expect(album).toBeNull();
});

test('Album was not created with invalid year.', async () => {
	const { title, year } = generateAlbumData();
	const album = await model.create(title, -22);

    expect(album).toBeNull();
});

test('Album was not created with duplicate title.', async () => {
	const { title, year } = generateAlbumData();
	const album = await model.create(title, year);
	const duplicateAlbum = await model.create(title, year);

    expect(duplicateAlbum).toBeNull();
});

// READ
test('Album was found by title.', async () => {
    // Create new album and add to database
	const { title, year } = generateAlbumData();
	await model.create(title, year);


    // Get an array of all albums and see if we can find the created album with correct fields
	const albums = await model.findByTitle(title);

    expect(Array.isArray(albums)).toBe(true);
    expect(albums[0].title).toBe(title);
    expect(albums[0].year).toBe(year);
});

test('Album was not found by wrong title.', async () => {
    // Create new album and add to database
	const { title, year } = generateAlbumData();
	await model.create(title, year);

    const albums = await model.findByTitle("aaaaaa");

    expect(albums.length).toBe(0);
});

// UPDATE
test('Album was updated successfully!', async () => {
    // Create new album and add to database
	const { title, year } = generateAlbumData();
	await model.create(title, year);

    // Update album with new properties
    const newTitle = "New Album Title";
    const newYear = year - 2;
    const success = await model.update(title, newTitle, newYear);

    // Find the album with its new title to verify that it was properly updated
    const albums = await model.findByTitle(newTitle);

    expect(success).toBe(true);
    expect(albums[0]).toBeInstanceOf(Object);
    expect(albums[0].title).toBe(newTitle);
    expect(albums[0].year).toBe(newYear);
});

test('Album was not updated with blank title', async () => {
    // Create new album and add to database
	const { title, year } = generateAlbumData();
	await model.create(title, year);

    // Update album with new properties
    const newTitle = "";
    const newYear = year - 2;
    const success = await model.update(title, newTitle, newYear);

    expect(success).toBe(false);
});


// DELETE
test('Album was removed successfully.', async () => {
    // Create new album and add to database
	const { title, year } = generateAlbumData();
	await model.create(title, year);

    const success = await model.remove(title, year);
    expect(success).toBe(true);
});



afterEach(async () => {
    model.endConnection();
})