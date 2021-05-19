// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const db = require('./db/db.json');
const noteData = require('./js/noteData.js');
const PORT = 3000;


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
    response.json(db);
});

// Getting index.html when any path not specified is requested
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'));
});

// function to write added note to the db.json file
function writeToDatabase() {
    let noteValue = JSON.stringify(db);
    fs.writeFile(path.join(__dirname, './db/db.json'), noteValue, function (err) {
        if (err) throw err;
        console.log('Done!');
    });
}

// Posting the note information to the db array and invoking the writeToDatabase function
app.post('/api/notes', (request, response) => {
    const newNote = noteData(request.body);
    db.push(newNote);
    writeToDatabase();
    response.status(200).send('Successfully added the note.');
})

// Deleting the specified note by using the unique ID and invoking the writeToDatabase function
app.delete('/api/note/:id', (request, response) => {
    const idOfNote = request.params.id;
    // The filter() method assigns the filtered content to db
    db = db.filter(data => data.id !== idOfNote);
    writeToDatabase();
    response.status(200).send('Successfully deleted the note.');
})

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
