import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { deleteNote, getnote, updateNote, upload } from '../controllers/note.controllers.js';
import uploadm from '../middlewares/multer.js';
const noteroute = express.Router();

noteroute.post('/upload',isAuth,uploadm.single('file'),upload)
noteroute.get('/getnotes',isAuth,getnote)
noteroute.delete('/delete/:noteId',isAuth,deleteNote)
noteroute.put('/update/:noteId',isAuth,updateNote)
export default noteroute