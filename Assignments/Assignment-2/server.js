const app = require('./app.js');
const port = 1339;
const model = require('./models/album-model');
model.initialize('music_db', false)
    .then(
        app.listen(port) // Run the server
    );
