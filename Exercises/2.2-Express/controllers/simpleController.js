const express = require('express');
const router = initializeRouter();
const routeRoot = '/simple';

function initializeRouter(){
    const r = express.Router();
    r.get('/hello', sayHello);
    r.get('/bye', sayBye);
    r.post('/mail', sendMail);
    return r;
}


function sayHello(request, response){
    const firstName = request.query.firstName;
    response.send(`Simple: Hello Sir ${firstName}`);
}

function sayBye(request, response){
    const firstName = request.query.firstName;
    response.send(`Simple: Goodbye Sir ${firstName}`);
}

function sendMail(request, response){
    // Convert request to Json format
    let requestJson = request.body;
    response.send(`Simple: Hello ${requestJson.firstName} ${requestJson.lastName}. Here is your mail from Canada Post.`);
}




module.exports = {
    sayHello,
    sayBye,
    sendMail,
    router,
    routeRoot
}