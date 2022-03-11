const mysql = require('mysql2/promise');
const validateUtils = require('./validateUtils');

var connection;

async function initialize(dbname, reset) {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '10003',
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
        return null;
    }

    // Execute Sql command to database
    const sqlQuery = `INSERT INTO pokemon (name, type) VALUES (?, ?)`;
    await connection.execute(sqlQuery, [name, type]).then(console.log(`${name} created successfully!`)).catch((error) => {console.error(error)});

    // return created pokemon
    const pokemon = {"name": name, "type": type}
    return pokemon;

}

async function listPokemon(){

    // Execute Sql command to database
    const sqlQuery = `SELECT * FROM pokemon`;
    const [pokemons, fields] = await connection.execute(sqlQuery).then(console.log(`Pokemon read successfully!`)).catch((error) => {console.error(error)});

    // return created pokemon
    return pokemons;

}



module.exports = {
    initialize,
    createPokemon,
    listPokemon,
    getConnection
}