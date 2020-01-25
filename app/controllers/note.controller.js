const Note = require('../models/note.model.js');

//create and save a new note
exports.add = (req, res) =>{
	//validate a request
	if (!req.body.content){
		return res.status(400).send({
			message: "note content can not be empty"
		});
	}

	//create a new note
	const note = new Note({
		title : req.body.title,
		content : req.body.content
	});

	//save the note in the database
	note.save()
	.then(data =>{
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "some error occured while creating this note"
		});
	});

};

//get all notes
exports.getAll = (req, res) =>{
	Note.find()
	.then(notes =>{
		res.send(notes);
	}).catch(err =>{
		res.status(500).send({
			message: err.message || "some error occured while retrieving notes"
		});
	});
};

//get a note by id
exports.getOne = (req, res) =>{
	Note.findById(req.params.noteId)
	.then(note => {
		if(!note) {
			return res.status(404).send({
				message: "no note found with id "+ req.params.noteId
			});
		}
		res.send(note);
	}).catch( err =>{
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: "no note found with id "+ req.params.noteId
			});
		}
		return res.status(500).send({
			message: "Error retrieving note with id "+req.params.noteId
		});
	});

};

//update a note of specific id
exports.update = (req, res) =>{
	//validate request
	if (!req.body.content) {
		return res.status(400).send({
			message:"Note content can't be empty"
		});
	}
	//find note by id and update it's content
	Note.findByIdAndUpdate(req.params.noteId,{
		title: req.body.title || "untitled note",
		content: req.body.content
	},{new: true})
	.then(note => {
		if(!note) {
			return res.status(404).send({
				message: "no note found with id "+ req.params.noteId
			});
		}
		res.send(note);
	}).catch(err =>{
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: "no note found with id "+ req.params.noteId
			});
		}
		return res.status(500).send({
			message: "Error retrieving note with id "+req.params.noteId
		});

	});

};

//delete a note
exports.delete = (req, res) =>{
	Note.findByIdAndRemove(req.params.noteId)
	.then(note => {
		if (!note) {
			return res.status(404).send({
				message: "no note found with id "+ req.params.noteId
			});
		}
		res.send({
			message:"Note deleted successfully"
		});
	}).catch( err => {
		if (err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "no note found with id "+ req.params.noteId
			});
		}
		return res.status(500).send({
			message: "coud not delete note with id "+ req.params.noteId
		});
	});

};