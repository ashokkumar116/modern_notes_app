const db = require('../db');


const createNote = async (req,res)=>{
    const {note} = req.body;
    const id = req.user.id;
    const timeframe = new Date().toISOString();
    const sql = "INSERT INTO notes (user_id,note,date) VALUES (?,?,?)";
    
    await db.query(sql,[id,note,timeframe]);
    res.status(200).json({message:"Note Added"});
}

const getAllNotes = async (req,res) =>{
    const id = req.user.id;
    const sql = "SELECT * FROM notes WHERE user_id =?";
    const [result] = await db.query(sql,[id]);
    if(result.length === 0){
        return res.json({message:"No Notes Found"})
    }
    res.json(result);
}

const editNote = async (req,res) =>{
    const note_id = req.params.id;
    const {editNote} = req.body;
    console.log("Note upadte",editNote);

    const sql = "UPDATE notes SET note = ? WHERE note_id = ?";

    await db.query(sql,[editNote,note_id]);

    res.status(200).json({message:"Note Updated"});
}

const deleteNote = async (req,res) =>{
    const note_id = req.params.id;

    const sql = "DELETE FROM notes WHERE note_id = ?";

    await db.query(sql,[note_id]);
    res.status(200).json({message:"Note Deleted"});

}


module.exports = { createNote , getAllNotes ,editNote,deleteNote};