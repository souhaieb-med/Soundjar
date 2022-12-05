const Note = require('../models/note')

const fetchNotes = async (req, res) => {
  // Find the notes
  const notes = await Note.find();
  // Respond with them
  res.json({ notes });
};

const fetchNote = async (req, res) => {
  // Get id off the url
  const noteId = req.params.id;
  //Find the note using that id
  const note = await Note.findById(noteId);

  // Respond with it
  res.json({ note });
};

const createNote = async (req, res) => {
  // Get the sent in data off request body
  const {title, body} = req.body ;

  // Create a note with it
  const note = await Note.create({
    title,
    body,
  });

  // Respond with the new note
  res.json({ note });
};

const updateNote = async (req, res) => {
  // Get the id of the url
  const noteId = req.params.id;

  // Get the data after request body
  const { title, body } = req.body;
  //Find and update the record
  await Note.findByIdAndUpdate(noteId, {
    title,
    body,
  });

  //Find updated note
  const note = await Note.findById(noteId);
  //Respond with it
  res.json({ note });
};

const deleteNote = async (req, res) => {
  //Get the id of the url
  const noteId = req.params.id;
  // Delete the record
  await Note.deleteOne({ id: noteId });
  //Respond
  res.json({ success: "deleted" });
};

module.exports = {
    fetchNote,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
}