const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const port = 1339;
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/home', home)
router.get('/about', about)


function home(request, response){
    const homePageData = {
        heading: "Home",
        content: "Welcome to our home page",
        image: "images/infernape.png",
        showDetails: false,
        details: {
            name: "Infernape",
            id: 25
        },
        comments: [
            "Great job",
            "Needs work",
            "Very interesting"
        ],
        item: [
            {name: "hat", price: 40},
            {name: "gloves", price: 10}
        ],

        helpers: {
            categorize
        }
    }

    response.render('page.hbs', homePageData);
}

function categorize(cost) {
    if (cost < 1) return "cheap";
    else if (cost < 10) return "normal";
    else return "expensive";
}

function handleInput(request, response){
    console.log(request.body.first_name, request.body.last_name);
}

function about(request, response){
    const homePageData = {
        heading: "About",
        content: "About Information",
        image: "https://www.clipartmax.com/png/full/470-4700418_shiny-greninja-png.png",
        showDetails: true,
        details: {
            name: "Greninja",
            id: 658
        },
        comments: [
            "Great job",
            "Needs work",
            "Very interesting"
        ],
        item: [
            {name: "hat", price: 40},
            {name: "gloves", price: 10}
        ],

        helpers: {
            categorize
        }
    }

    response.render('page.hbs', homePageData);
}

// Tell the app to use handlebars templating engine.  
//   Configure the engine to use a simple .hbs extension to simplify file naming
app.engine('hbs', engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');  // indicate folder for views
app.use(router);
app.use(express.static('public'))



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/input', handleInput);

app.listen(port); // Run the server!
