const express = require('express');
const { report } = require('process');

const app = express();
const port = 1339;
app.use(express.json());

const controllers = ['homeController', 'simpleController'];

// Register routes from all controllers
// Assumes a flat directory structure and common 'routeRoot' / 'router' exports
controllers.forEach((controllerName) => {
    try {
        const controllerRoutes = require('./controllers/' + controllerName);
        app.use(controllerRoutes.routeRoot, controllerRoutes.router);
    } catch (error) {
        // fail gracefully if no routes for this controller
        console.log('No routes added for controller: ' + controllerName);
    }
})

// Run the server!
app.listen(port);