module.exports = (app) => {
	const notes = require('../controllers/note.controller.js');
}

//creating new note
app.post('/notes',notes.add)

//get all notes
app.get('/notes',notes.getAll)

//get note by id
app.post('/notes/:noteId',notes.getOne)

//update a note
app.post('/notes/:noteId',notes.update)

//delete a note
app.post('/notes/:noteId',notes.delete)