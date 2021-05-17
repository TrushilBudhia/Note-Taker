// Dependencies
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Getting index.html when '/' path used
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'));
});

// Getting notes.html when '/notes' path is used
app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, './public/notes.html'));
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
