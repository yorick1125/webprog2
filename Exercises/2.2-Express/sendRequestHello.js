const http = require('http');
const dataToSend = {
    firstName: 'Yorick',
    lastName: 'Niyonkuru'
}

const params = new URLSearchParams(dataToSend).toString();
const options = {
    host:'localhost',
    port: 1337,
    path: '/hello?' + params, // create the path including the query parameters
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

let responseBody = '';
const request = http.request(options, handleResponse);

function handleResponse(response) {
    response.on('error', (err) => console.error(err)); // handle error
    response.on('data', (chunk) => responseBody += chunk); // collect response chunks
    response.on('end',() => console.log(responseBody));  // log the full response
}
request.on('error', (err) => console.error(err)); // handle error
request.end(); // finishes sending the request
