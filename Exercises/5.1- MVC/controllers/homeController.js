const express = require('express');
const router = express.Router();
const routeRoot = '/';
const model = require('../models/pokemonModelMysql')
router.get('/home', showHomepage)


function showHomepage(request, response){
    const homePageData = {
        heading: "Home",
        content: "Welcome to our homepage"
    }
    response.render('home.hbs', homePageData)
}







module.exports = {
    router,
    routeRoot
}