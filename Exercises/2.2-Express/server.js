const express = require('express');
const { report } = require('process');

const app = express();
const port = 1337;
const router = express.Router();
const controller = require('./controllers/controller')

// Handle an endpoint
// router.get('/hello', (request, response) => {
//     controller.sayHello(request, response);
// });

router.post('/mail',(request, response) => {
    controller.sendMail(request, response);
});
app.use('/', router);

// Run the server!
app.listen(port);