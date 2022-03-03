const sql = require('../models/pokemonModelMysql');

/* Data to be used to generate random pokemon for testing */
const pokemonData = [
{ name: 'Bulbasaur', type: 'grass' },
{ name: 'Charmander', type: 'fire' },
{ name: 'Squirtle', type: 'water' },
{ name: 'Pikachu', type: 'electric' },
{ name: 'Pidgeotto', type: 'flying' },
{ name: 'Koffing', type: 'poison' }
]

/** Since a Pokemon can only be added to the DB once, we have to splice from the array. */
const generatePokemonData = () => pokemonData.splice(Math.floor((Math.random() * pokemonData.length)), 1)[0];

/* Make sure the database is empty before each test.  This runs before each test.  See https://jestjs.io/docs/api */
beforeEach(async () => {
    try {
        await sql.initialize();
     } catch (err) {}
});

test('Pokemon was created successfully.', async () => {
	const { name, type } = generatePokemonData();
	const pokemon = await sql.createPokemon(name, type);

    expect(pokemon).toBeInstanceOf(Object);
    expect(pokemon.name).toBe(name);
    expect(pokemon.type).toBe(type);
});

test('Can add Pokemon to DB', async () => {
    const {name, type} = generatePokemonData();
    await sql.createPokemon(name, type);

    const selectQuery = "SELECT * FROM pokemon";
    const [rows, fields] = await sql.getConnection().execute(selectQuery);

    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBe(1);
    expect(rows[0].name.toLowerCase() == name.toLowerCase()).toBe(true);
    expect(rows[0].type.toLowerCase() == type.toLowerCase()).toBe(true);
});


afterEach(async () => {
    const connection = sql.getConnection();
    if(connection){
        connection.end();
    }
})