const express = require('express');
const router = express.Router();
const routeRoot = '/';

function sayHello(request, response){
    const firstName = request.query.firstName;
    response.send(`Hello Sir ${firstName}`);
}

function sayBye(request, response){
    const firstName = request.query.firstName;
    response.send(`Goodbye Sir ${firstName}`);
}

function sendMail(request, response){
    // Convert request to Json format
    let requestJson = request.body;
    response.send(`Hello ${requestJson.firstName} ${requestJson.lastName}. Here is your mail from Canada Post.`);
}



module.exports = {
    sayHello,
    sayBye,
    sendMail
}