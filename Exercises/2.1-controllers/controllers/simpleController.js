const url = require('url').URL;

function handle(request, response, endPoint){

    if(request.method === 'GET' && endPoint === '/hello'){
        sayHello(request, response);
        return true;
    }
    else if(request.method === 'GET' && endPoint === '/bye'){
        sayBye(request, response)
        return true;
    }
    else if(request.method === 'POST' && endPoint === '/mail'){
        postMail(request, response)
        return true;
    }
    else{
        showError(request, response)
        return false;
    }
}

function sayHello(request, response){
    const fullUrl = new URL(request.url, `http://${request.headers.host}`)
    const params = fullUrl.searchParams;
    const firstName = params.get("firstName") ?? "";
    const lastName = params.get("lastName") ?? "";

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(`Hello World `);
    response.end(`${firstName} ${lastName}`);
}

function sayBye(request, response){
    const fullUrl = new URL(request.url, `http://${request.headers.host}`)
    const params = fullUrl.searchParams;
    const firstName = params.get("firstName") ?? "";
    const lastName = params.get("lastName") ?? "";

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(`Goodbye World `);
    response.end(`${firstName} ${lastName}`);
}

function postMail(request, response){
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

function showError(request, response){
    response.statusCode = 404;
    response.end('404 Not Found');
}

module.exports = {
    handle
}