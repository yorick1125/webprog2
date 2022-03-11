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
        const dropQuery = "DROP TABLE IF EXISTS album";
        try{
            await connection.execute(dropQuery);
            console.log("Table album dropped")
        }
        catch(error){
            console.error(error.message);
        }
    }

    try{
        const sqlQuery = 'CREATE TABLE IF NOT EXISTS album(id int AUTO_INCREMENT, name VARCHAR(50), type VARCHAR(50), PRIMARY KEY (id))';
        await connection.execute(sqlQuery);
        console.log("Table album created/exists");
    }
    catch(error){
        console.error(error.message);
    }

}

function getConnection(){
    return connection;
}


async function createAlbum(name, type){
    // Validate Input
    if(!validateUtils.isValid(name, type)){
        return null;
    }

    // Execute Sql command to database
    const sqlQuery = `INSERT INTO album (name, type) VALUES (?, ?)`;
    await connection.execute(sqlQuery, [name, type]).then(console.log(`${name} created successfully!`)).catch((error) => {console.error(error)});

    // return created album
    const album = {"name": name, "type": type}
    return album;

}



module.exports = {
    initialize,
    createAlbum,
    getConnection
}