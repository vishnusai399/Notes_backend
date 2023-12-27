
import express from 'express'
import  cors from 'cors';
import connectDatabase from './config/database.js';

import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


connectDatabase()



const noteSchema = new mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now },
  });
  
  const Note = mongoose.model('Note', noteSchema);
  
  // API endpoints
  app.get('/api/notes', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/api/notes', async (req, res) => {
    try {
      const { text } = req.body;
      const newNote = new Note({ text });
      await newNote.save();
      res.json(newNote);
    } catch (error) {
      console.error('Error adding note:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.put('/api/notes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(id, { text }, { new: true });
      res.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.delete('/api/notes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Note.findByIdAndDelete(id);
      res.send('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
