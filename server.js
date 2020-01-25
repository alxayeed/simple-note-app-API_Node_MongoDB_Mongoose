//import modules
const express = require('express');
const bodyParser = require('body-parser')

//create express app
const app = express()

//Setting up middleware
app.use(bodyParser.urlencoded({ extended: true}))

app.use(bodyParser.json())

//configuring Database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,useUnifiedTopology: true
}).then(() => {
	console.log("Sucesfully connected to the database");
}).catch(err => {
	console.log("Database connection failed.Exiting now...",err);
	process.exit();
});


//defining route
app.get('/',(req, res) => {
	res.json({"message":"An easy note app,built with NodeJs,MongoDB"})
});

//Require notes routes
require('./app/routes/note.route.js')(app);

app.listen(2020,() =>{
	console.log("server is up and running on port 2020")
});