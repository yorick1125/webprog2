const express = require('express');
const router = express.Router();
const routeRoot = '/';
router.all('*', showError);




function showError(request, response){
    response.status(404)
    response.send('Invalid URL entered. Please try again. ')
}

module.exports = {
    router,
    routeRoot
}

