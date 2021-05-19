// Importing the uniqid package module
const uniqid = require('uniqid');

// function to create a new note with the id property
function noteData(request) {
    return newNote = {
        "title": request.title,
        "text": request.text,
        "id": uniqid()
    }
}

// Exporting the noteData function
module.exports = noteData;