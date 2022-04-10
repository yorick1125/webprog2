const express = require('express');
const router = express.Router();
const routeRoot = '/home';

router.get('/', showHomepage)

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