const mysql = require('mysql2/promise');
const validateUtils = require('./validateUtils');

var connection;

/**
 * Initializes Database and creates Album table with ID, Title and Release Year as fields if the table does not already exist
 * 
*/
async function initialize(dbName, reset) {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '10000',
        password: 'pass',
        database: dbName
    });


    if (reset){
        const dropQuery = "DROP TABLE IF EXISTS album";
        try{
            await connection.execute(dropQuery);
        }
        catch(error){
            console.error(error.message);
        }
    }

    try{
        const sqlQuery = 'CREATE TABLE IF NOT EXISTS album(id int AUTO_INCREMENT, title VARCHAR(50), year INT, PRIMARY KEY (id))';
        await connection.execute(sqlQuery);
    }
    catch(error){
        console.error(error);
    }
}


/**
 * Creates a new album based on its title and release year.
* @param {string} tableTitle
* @returns {boolean} success of truncate
*/
async function truncate(tableTitle){
    try{
        const sqlQuery = `TRUNCATE TABLE ${tableTitle}`;
        await connection.execute(sqlQuery);
        return true;
    }
    catch(error){
        console.error(error);
        return false;
    }
}

/**
 * Creates a new album based on its title and release year.
* @param {string} title
* @param {number} year
* @returns {Object} An album Object
*/
async function create(title, year){
    // Validate Input
    if(!validateUtils.isValid(title, year)){
        throw new InvalidInputError(`Invalid input when trying to create ${title} released in ${year}. `);
    }

    // check if album already exists
    const albums = await findByTitle(title);
    if(albums.length > 0){
        throw new InvalidInputError(`${title} already exists. `);
    }

    try{
        // Execute Sql command to database
        const sqlQuery = `INSERT INTO album (title, year) VALUES (?, ?)`;
        await connection.execute(sqlQuery, [title, year]);

        // return created album
        const album = {"title": title, "year": year}
        return album;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

/**
 * Finds an album based on id
* @param {number} id
* @returns {Object} An album object
*/
async function findById(id){
    try{
        // Execute Sql command to database
        const sqlQuery = `SELECT * FROM album WHERE id = ?`;
        const [albums, fields] = await connection.execute(sqlQuery, [title]);

        return albums[0];
    }
    catch(error){
        console.error(error.message);
        return null;
    }

}

/**
 * Finds an album based on its title
* @param {string} title
* @returns {Array} An array of album objects
*/
async function findByTitle(title){
    try{
        // Execute Sql command to database
        const sqlQuery = `SELECT * FROM album WHERE title = ?`;
        const [albums, fields] = await connection.execute(sqlQuery, [title]);

        return albums;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

/**
 * Finds all albums in the table
* @returns {Array} An array of album objects
*/
async function findAll(){

    try{
        // Execute Sql command to database
        const sqlQuery = `SELECT * FROM album`;
        const [albums, fields] = await connection.execute(sqlQuery);

        return albums;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

/**
 * Updates an album with a new title and year.
* @param {string} currentTitle
* @param {string} newTitle
* @param {number} newYear
* @returns {boolean} whether update was successful
*/
async function update(currentTitle, newTitle, newYear){
    // Validate Input for both current and new title, and make sure element exists
    if(!validateUtils.isValid(newTitle, newYear)){
        throw new InvalidInputError(`Invalid input when trying to update fields to ${newTitle} and ${newYear}`);
    }

    try {
        if(await findByTitle(currentTitle) == null){
            console.error(`No such album with title ${currentTitle}`);
            return false;
        }
    } 
    catch (error) {
        throw error;
    }



    try{
        // Execute Sql command to database
        const sqlQuery = `UPDATE album SET title = ?, year = ? WHERE title = ?`;
        await connection.execute(sqlQuery, [newTitle, newYear, currentTitle]);

        return true;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

/**
 * Deletes any album containing the specified title and year
* @param {string} title
* @param {number} year
* @returns {boolean} if db is now removed of that album
*/
async function remove(title, year){

    // if album doesn't exist
    if(findByTitle(title).length < 1){
        return false;
    }

    try{
        // Execute Sql command to database
        const sqlQuery = `DELETE FROM album WHERE title = ? AND year = ?`;
        await connection.execute(sqlQuery, [title, year]);

        return true;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}


function getConnection(){
    return connection;
}

function endConnection(){
    if(connection){
        connection.end();
    }
}

class InvalidInputError extends Error {
    
}

class InvalidFileError extends Error {

}

class DatabaseExecutionError extends Error {

}

module.exports = {
    initialize,
    truncate,
    create,
    findByTitle,
    findAll,
    update,
    remove,
    getConnection,
    endConnection,
    InvalidFileError,
    InvalidInputError,
    DatabaseExecutionError
}