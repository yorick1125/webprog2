const express = require('express');
const router = initializeRouter();
const routeRoot = '/';

function initializeRouter(){
    const r = express.Router();
    r.get('/hello', sayHello);
    r.get('/bye', sayBye);
    r.post('/mail', sendMail);
    return r;
}


function sayHello(request, response){
    const firstName = request.query.firstName;
    response.send(`Hello World ${firstName}`);
}

function sayBye(request, response){
    const firstName = request.query.firstName;
    response.send(`Home: Goodbye Sir ${firstName}`);
}

function sendMail(request, response){
    // Convert request to Json format
    let requestJson = request.body;
    response.send(`Hello ${requestJson.firstName} ${requestJson.lastName}. Here is your mail from Canada Post.`);
}


function oldSendMail(request, response){
    let requestBody = '';
    request.on('error', (err) => console.error(err));
    request.on('data', (chunk) => requestBody += chunk);
    request.on('end', () => {
        // Convert request to Json format
        requestJson = JSON.parse(requestBody);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(requestJson.firstName + " " + requestJson.lastName + '\n');
        response.write('Canada '); 
        response.end('Post');
    })

}



module.exports = {
    sayHello,
    sayBye,
    sendMail,
    router,
    routeRoot
}