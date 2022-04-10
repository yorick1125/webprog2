const mysql = require('mysql2/promise');
const validateUtils = require('./validateUtils');

var connection;

async function initialize(dbname, reset) {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '10000',
        password: 'pass',
        database: dbname
    });

    if (reset){
        const dropQuery = "DROP TABLE IF EXISTS pokemon";
        try{
            await connection.execute(dropQuery);
            console.log("Table pokemon dropped")
        }
        catch(error){
            console.error(error.message);
        }
    }

    try{
        const sqlQuery = 'CREATE TABLE IF NOT EXISTS pokemon(id int AUTO_INCREMENT, name VARCHAR(50), type VARCHAR(50), PRIMARY KEY (id))';
        await connection.execute(sqlQuery);
        console.log("Table pokemon created/exists");
    }
    catch(error){
        console.error(error.message);
    }

}

function getConnection(){
    return connection;
}


async function createPokemon(name, type){
    // Validate Input
    if(!validateUtils.isValid(name, type)){
        throw new InvalidInputError(`Invalid input when trying to create ${name} of type ${type}. `);
    }

    try{
        // Execute Sql command to database
        const sqlQuery = `INSERT INTO pokemon (name, type) VALUES (?, ?)`;
        await connection.execute(sqlQuery, [name, type]);

        // return created pokemon
        const pokemon = {"name": name, "type": type}
        return pokemon;
    }
    catch(error){
        throw new DatabaseExecutionError(error.message);
    }


}

async function findByName(name){
    try{
        // Execute Sql command to database
        const sqlQuery = `SELECT * FROM pokemon WHERE name = ?`;
        const [pokemons, fields] = await connection.execute(sqlQuery, [name]);

        return pokemons[0];
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

async function findAll(){

    try{
        // Execute Sql command to database
        const sqlQuery = `SELECT * FROM pokemon`;
        const [pokemons, fields] = await connection.execute(sqlQuery);

        return pokemons;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

async function update(currentName, newName, newType){
    // Validate Input for both current and new title, and make sure element exists
    if(!validateUtils.isValid(newName, newType)){
        throw new InvalidInputError(`Invalid input when trying to update fields to ${newName} and ${newType}`);
    }

    if(findByName(currentName) == null){
        console.error(`No such pokemon with name ${currentName}`);
        return false;
    }


    try{
        // Execute Sql command to database
        const sqlQuery = `UPDATE pokemon SET name = ?, type = ? WHERE name = ?`;
        await connection.execute(sqlQuery, [newName, newType, currentName]);

        return true;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
    }

}

async function remove(name, type){
    try{
        // Execute Sql command to database
        const sqlQuery = `DELETE FROM pokemon WHERE name = ? AND type = ?`;
        await connection.execute(sqlQuery, [name, type]);

        return true;
    }
    catch(error){
        console.error(error.message);
        throw new DatabaseExecutionError(error.message);
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
    createPokemon,
    getConnection,
    findByName,
    findAll,
    update,
    remove,
    InvalidFileError,
    InvalidInputError,
    DatabaseExecutionError
}