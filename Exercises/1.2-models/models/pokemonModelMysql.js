const mysql = require('mysql2/promise');
const validateUtils = require('./validateUtils');

var connection;

async function initialize() {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '10000',
        password: 'pass',
        database: 'pokemon_db'
    });



    const sqlQuery = 'CREATE TABLE IF NOT EXISTS pokemon(id int AUTO_INCREMENT, name VARCHAR(50), type VARCHAR(50), PRIMARY KEY (id))';

    await connection.execute(sqlQuery).then(console.log("Table pokemon created/exists")).catch((error) => {console.error(error)});
}

async function createPokemon(name, type){
    // Validate Input
    if(!validateUtils.isValid(name, type)){
        return;
    }

    // Execute Sql command to database
    const sqlQuery = `INSERT INTO pokemon (name, type) VALUES (?, ?)`;
    await connection.execute(sqlQuery, [name, type]).then(console.log(`${name} created successfully!`)).catch((error) => {console.error(error)});

    // return created pokemon
    const pokemon = {"name": name, "type": type}
    return pokemon;

}


function getConnection(){
    return connection;
}

module.exports = {
    initialize,
    createPokemon,
    getConnection
}