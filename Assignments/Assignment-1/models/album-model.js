const mysql = require('mysql2/promise');
const validateUtils = require('./validateUtils');

var connection;

/**
 * Initializes Database and creates Album table with ID, Name and Release Year as fields if the table does not already exist
 * 
*/
async function initialize() {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '10000',
        password: 'pass',
        database: 'music_db'
    });


    try{
        const sqlQuery = 'CREATE TABLE IF NOT EXISTS album(id int AUTO_INCREMENT, name VARCHAR(50), year INT, PRIMARY KEY (id))';
        await connection.execute(sqlQuery);
    }
    catch(error){
        console.error(error);
    }
}

/**
 * Creates a new album based on its name and release year.
* @param {string} tableName
* @returns {boolean} success of truncate
*/
async function truncate(tableName){
    try{
        const sqlQuery = `TRUNCATE TABLE ${tableName}`;
        await connection.execute(sqlQuery);
        console.log(`Table ${tableName} created/exists`);
        return true;
    }
    catch(error){
        console.error(error);
        return false;
    }
}

/**
 * Creates a new album based on its name and release year.
* @param {string} name
* @param {number} year
* @returns {Object} An album Object
*/
async function create(name, year){
    // Validate Input
    if(!validateUtils.isValid(name, year)){
        return null;
    }


    try{
        // Execute Sql command to database
        const sqlQuery = `INSERT INTO album (name, year) VALUES (?, ?)`;
        await connection.execute(sqlQuery, [name, year]);

        // return created album
        const album = {"name": name, "year": year}
        return album;
    }
    catch(error){
        console.error(error.message);

    }

}

/**
 * Finds an album based on its name
* @param {number} name
* @returns {Array} An array of album objects
*/
async function findByName(name){
    try{
        // Execute Sql command to database
        const sqlQuery = `SELECT * FROM album WHERE name = ?`;
        const [albums, fields] = await connection.execute(sqlQuery, [name]);

        return albums;
    }
    catch(error){
        console.error(error.message);
        return null;
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
        return null;
    }

}

/**
 * Updates an album with a new name and year.
* @param {string} currentName
* @param {string} newName
* @param {number} newYear
* @returns {boolean} whether update was successful
*/
async function update(currentName, newName, newYear){
    // Validate Input for both current and new name, and make sure element exists
    if(!validateUtils.isValid(currentName, newYear)){
        throw new InvalidInputError(`Invalid input when trying to update fields to ${newName} and ${newYear}`);
    }

    if(findByName(currentName) == null){
        console.error(`No such album with name ${currentName}`);
        return false;
    }


    try{
        // Execute Sql command to database
        const sqlQuery = `UPDATE album SET name = ?, year = ? WHERE name = ?`;
        await connection.execute(sqlQuery, [newName, newYear, currentName]);

        return true;
    }
    catch(error){
        console.error(error.message);
        return false;
    }

}

/**
 * Deletes any album containing the specified name and year
* @param {string} name
* @param {number} year
* @returns {boolean} if db is now removed of that album
*/
async function remove(name, year){
    try{
        // Execute Sql command to database
        const sqlQuery = `DELETE FROM album WHERE name = ? AND year = ?`;
        await connection.execute(sqlQuery, [name, year]);
        
        return true;
    }
    catch(error){
        console.error(error.message);
        return false;
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

module.exports = {
    initialize,
    truncate,
    create,
    findByName,
    findAll,
    update,
    remove,
    getConnection,
    endConnection,
    InvalidFileError,
    InvalidInputError
}