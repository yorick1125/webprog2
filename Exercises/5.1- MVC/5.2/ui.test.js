const model = require('../models/pokemonModelMysql');
const dbName = "pokemon_db_test"; 
const home = "http://localhost:1339/home"; // or /home depending on your endpoint

/* Data to be used to generate random pokemon for testing */
const pokemonData = [
    { name: 'Bulbasaur', type: 'Grass' },
    { name: 'Charmander', type: 'Fire' },
    { name: 'Squirtle', type: 'Water' },
    { name: 'Pikachu', type: 'Electric' },
    { name: 'Pidgeotto', type: 'Psychic' },
    { name: 'Koffing', type: 'Normal' }
    ]
    
/** Splice version: Ensures a Pokemon can only be added to the DB once. */
//const generatePokemonData = () => pokemonData.splice(Math.floor((Math.random() * pokemonData.length)), 1)[0];

// Slice version - Allows many tests without ever "running out" of generated pokemon
const generatePokemonData = () => {
    const index = Math.floor((Math.random() * pokemonData.length));
    return pokemonData.slice(index, index+1)[0];
}




beforeEach(async()=> {
    await model.initialize(dbName, true);
    // load home page and wait until it is fully loaded
    await page.goto(home, {waitUntil: "domcontentloaded"});
})

	
test("Add Pokemon UI test success", async() => {
    // Enter random pokemon name & type into the form
    const { name, type } = generatePokemonData();

    await page.type('#name', name);
    await page.type('#type', type);
    
    // click form's submit button and wait for new page to load
    await page.click('[type="submit"]', {waitUntil: 'domcontentloaded'});

    // Extract all the text content on the page   
    const text = await page.evaluate(() => document.body.textContent);
    const textLower = text.toLowerCase();

    // Verify successful outcome 
    expect(textLower).toContain('successfully'); // Part of message shown on success view
    expect(textLower).toContain(name.toLowerCase());
    expect(textLower).toContain(type.toLowerCase());



    // wait 5 seconds so we can see the browser before it closes.
    await new Promise(resolve =>  setTimeout(resolve, 5000)); 
});

test("List created successfully", async() => {
    // Enter random pokemon name & type into the form
    const { name, type } = generatePokemonData();

    await page.type('#name', name);
    await page.type('#type', type);
    
    // click form's submit button and wait for new page to load
    await page.click('[type="submit"]', {waitUntil: 'domcontentloaded'});

    // Extract all the text content on the page   
    const text = await page.evaluate(() => document.body.textContent);
    const textLower = text.toLowerCase();

    // Verify successful outcome 
    expect(textLower).toContain('successfully'); // Part of message shown on success view
    expect(textLower).toContain(name.toLowerCase());
    expect(textLower).toContain(type.toLowerCase());



    // wait 5 seconds so we can see the browser before it closes.
    await new Promise(resolve =>  setTimeout(resolve, 5000)); 
});
    


afterEach(async () => {
    connection = model.getConnection();
    if (connection) {
        await connection.close();
    } 
    await page.close();
});

    