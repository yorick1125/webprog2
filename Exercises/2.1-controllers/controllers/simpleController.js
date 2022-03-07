function handle(method, url, response){

    if(method === 'GET' && url === '/hello'){
        sayHello(response);
        return true;
    }
    else if(method === 'GET' && url === '/bye'){
        sayBye(response)
        return true;
    }
    else if(method === 'POST' && url === '/mail'){
        canadaPost(response)
        return true;
    }
    else{
        showError(response)
        return false;
    }

}

function sayHello(response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Hello ")
    response.end('World');
}

function sayBye(response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Goodbye ")
    response.end('World');
}

function canadaPost(response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Canada Post');
}

function showError(response){
    response.statusCode = 404;
    response.end('404 Not Found');
}

module.exports = {
    handle
}