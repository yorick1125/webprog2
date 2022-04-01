const express = require('express');
const router = express.Router();
const routeRoot = '/';
router.all('*', showError);




function showError(request, response){
    // response.status(404)
    // response.send('Invalid URL entered. Please try again. ')

    const homePageData = {
        showAlert: true,
        alertMessage: 'Invalid URL entered. Please try again. '
    };

    response.render('home.hbs', homePageData);
}

module.exports = {
    router,
    routeRoot
}

