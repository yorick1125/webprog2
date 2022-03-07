function sayHello(request, response){
    response.send('Hello World');
}

function sayBye(request, response){
    response.send('GoodBye World');
}

function sendMail(request, response){
    requestJson = request.body;
    response.send(requestJson);
}



module.exports = {
    sayHello,
    sayBye,
    sendMail
}