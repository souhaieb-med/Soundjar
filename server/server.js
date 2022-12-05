//Load env variables
if(process.env.NODE_ENV != "production"){
    
    require("dotenv").config();
}

// Import dependencies
const express = require('express');
const cors = require('cors')
const connectedDb = require('./config/connectingDb');
const noteController = require('./controllers/noteControllers')

//create an express app 

const app = express();

//config express 
app.use(express.json());
app.use(cors());

//connecting to database

connectedDb();
//Routing 

app.get("/notes",  noteController.fetchNotes );

app.get("/notes/:id", noteController.fetchNote);

app.post('/notes', noteController.createNote );

app.put('/notes/:id', noteController.updateNote);

app.delete('/notes/:noteId', noteController.deleteNote);

//start our server 
app.listen(process.env.PORT);