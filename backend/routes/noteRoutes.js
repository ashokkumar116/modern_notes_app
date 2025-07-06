const express = require('express');
const { createNote, getAllNotes, editNote, deleteNote } = require('../controllers/noteController');
const auth = require('../middlewares/auth')
const router = express.Router();

router.post('/create',auth,createNote);
router.get('/getnotes',auth,getAllNotes);
router.put('/edit/:id',editNote);
router.delete('/delete/:id',deleteNote);

module.exports = router;