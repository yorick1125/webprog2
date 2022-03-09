const express = require('express');
const { report } = require('process');

const app = express();
const port = 1337;

const controller = require('./controllers/controller');

app.use(express.json());

// router.get('/hello', controller.sayHello);
// router.get('/bye', controller.sayBye);
// router.post('/mail', controller.sendMail);

//app.use('/', router);
app.use(controller.routeRoot, controller.router);

// Run the server!
app.listen(port);