// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const noteData = require('./js/noteData.js');
let database = require('./db/db.json');

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Serving static files from the directory public - the CSS and JavaScript files
app.use(express.static("public"));
// Getting notes.html when '/notes' path is requested
app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, './public/notes.html'));
});

// Getting the notes json data when '/api/notes' path is requested
app.get('/api/notes', (request, response) => {
    //console.log(db);
    response.json(database);
});

// Getting index.html when any path not specified is requested
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'));
});

// function to write note information to the db.json file
function writeToDatabase() {
    let noteValue = JSON.stringify(database);
    fs.writeFile(path.join(__dirname, './db/db.json'), noteValue, function (err) {
        if (err) throw err;
        console.log('Success!');
    });
}

// Posting the note information to the db array and invoking the writeToDatabase function
app.post('/api/notes', (request, response) => {
    const newNote = noteData(request.body);
    database.push(newNote);
    writeToDatabase();
    response.status(200).send('Successfully added the note.');
})

// Deleting the specified note by using the unique ID and invoking the writeToDatabase function
app.delete('/api/notes/:id', (request, response) => {
    const idOfNote = request.params.id;
    // The filter() method assigns the content that doesn't have the id of the idOfNote to the database variable
    // The note with the idOfNote is removed
    database = database.filter(data => data.id !== idOfNote);
    writeToDatabase();
    response.send('Successfully deleted the note.');
})

// Listener to start the server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
