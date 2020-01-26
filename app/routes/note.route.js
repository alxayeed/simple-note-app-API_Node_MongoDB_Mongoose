module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

//Defining routes

//index
app.get('/',notes.index);

//creating new note
app.post('/notes',notes.add);

//get all notes
app.get('/notes',notes.getAll);

//get note by id
app.get('/notes/:noteId',notes.getOne);

//update a note
app.put('/notes/:noteId',notes.update);

//delete a note
app.delete('/notes/:noteId',notes.delete);
}