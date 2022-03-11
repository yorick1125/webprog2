const express = require('express');
const router = express.Router();
const routeRoot = '/';

router.get('/', showHomepage)

function showHomepage(request, response){
    response.send('Homepage')
}

module.exports = {
    router,
    routeRoot
}