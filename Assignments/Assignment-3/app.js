const express = require('express');
const app = express();

// Make sure errorController is last!
const controllers = ['homeController', 'albumController', 'errorController'] 

app.use(express.json());

// Register routes from all controllers 
//  (Assumes a flat directory structure and common 'routeRoot' / 'router' export)
controllers.forEach((controllerName) => {
    try {
        const controllerRoutes = require('./controllers/' + controllerName);
        app.use(controllerRoutes.routeRoot, controllerRoutes.router);
    } catch (error) {
      //fail gracefully if no routes for this controller
       console.log(error);
    }    
})

module.exports = app
