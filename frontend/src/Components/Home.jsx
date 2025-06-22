import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/Authcontext'
import axios from '../axios';

const Home = () => {
  const {user,logout} = useContext(AuthContext);
  const [notes,setNotes] = useState([]);
  const [message,setMessage] = useState(null);
  const [noteValues,setNoteValues] = useState({});
  const [note,setNote] = useState("");
  const [isEditing,setIsEditing] = useState(false);
  const [editNote,setEditNote] = useState("");
  const [deleteNoteId,setDeleteNoteId] = useState(null);
  const [editId,setEditId] = useState(null);
  const [showConfirm,setShowConfirm] = useState(false);
  const [showCreatedToast,setShowCreatedToast] = useState(false);
  const [showEditedToast,setShowEditedToast] = useState(false);
  const [showDeletedToast,setShowDeletedToast] = useState(false);

  const fetchNotes = async()=>{
    const response  =await axios.get('/notes/getnotes');
    setNotes(response.data);
    setMessage(response.data.message);
    console.log("Notes",response.data)
  }

  useEffect(()=>{
      fetchNotes();
      console.log(notes);
  },[])

  const handleLogout =async ()=>{
    await logout();

  }

  const handleChange = (e)=>{
    setNote(e.target.value);
  }

  const handleCreate = async(e)=>{
    e.preventDefault();
    await axios.post('/notes/create',{note});
    fetchNotes();
    setNote("");
    setShowCreatedToast(true);
    setTimeout(()=>{
      setShowCreatedToast(false)
    },3000)
  }

  const handleEdit = (note) =>{
    setIsEditing(true);
    setEditNote(note.note);
    setEditId(note.note_id);
    console.log(editId);
  }

  const handleEditSubmit = async(e) =>{
      e.preventDefault();
      await axios.put (`/notes/edit/${editId}`,{editNote});
      console.log(editNote)
      fetchNotes(); 
      console.log(editId);
      setIsEditing(false);
      setEditNote("");
      setEditId(null);
      setShowEditedToast(true);
      setTimeout(()=>{
        setShowEditedToast(false)
      },3000)
  }

  const handleDeleteConfirm = (note_id)=>{
      setDeleteNoteId(note_id);
      setShowConfirm(true);
  }

  const handleDelete = async(e) =>{
    e.preventDefault();
    await axios.delete(`/notes/delete/${deleteNoteId}`);
    setShowConfirm(false);
    fetchNotes();
    setShowDeletedToast(true);
    setTimeout(()=>{
      setShowDeletedToast(false)
    },3000)

  }

  return (
    <div className='flex flex-col justify-center items-center  gap-10 mt-40 '>
      <h1 className='text-2xl font-bold'>Welcome {user.username.toUpperCase()}</h1>

    <form onSubmit={handleCreate} className='flex flex-col items-center justify-center gap-5'>

      <textarea name="note" cols={50} className='textarea textarea-primary' rows="5" value={note}  onChange={handleChange}></textarea>
      <button type='submit' className='btn btn-success'>CREATE NOTE</button>
    </form>

      <div className='mb-10 flex flex-col justify-center items-center gap-5'>
      {notes.length>0 && notes.map((note)=>{
        return <div className="card border border-primary p-5 w-100 text-wrap" key={note.note_id}>
          <p className='text-2xl mb-5'>{note.note}</p>
          <p className='text-[10px]'>Created at {note.date}</p>
          <div className="btns flex gap-4 mt-4">
          <button className='btn btn-warning' onClick={()=>handleEdit(note)}>Edit</button>
          <button className='btn btn-error' onClick={()=>handleDeleteConfirm(note.note_id)}>Delete</button>
          </div>
        </div>
      })}

      </div>
      
      {message && <p>{message}</p>}

      {isEditing && (
        <div className="editModal mb-5 z-50 fixed top-0 bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%]">
        <form onSubmit={handleEditSubmit} className='animate-popup absolute top-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center rounded-md bg-gray-800 p-10'>

          <textarea name="note" cols="50" rows="5" className='textarea textarea-primary' value={editNote} onChange={(e)=>setEditNote(e.target.value)}></textarea>
          <button type='submit' className='btn btn-info'>Update Note</button>
          <button className='btn btn-error' onClick={()=>setIsEditing(false)}>Cancel</button>


        </form>
      </div>
      )}

        {showConfirm && (
          <div className='mb-5 fixed z-50 top-0 bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%]'>
            <div className="confirm animate-popup absolute top-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center rounded-md bg-gray-800 p-10 w-100">
              <p>Are you sure want to delete this Note ?</p>
              <div className="btns flex gap-5 items-center justify-center">
              <button className='btn btn-error' onClick={(e)=>handleDelete(e,deleteNoteId)} >Yes</button>
              <button className='btn btn-success' onClick={()=>setShowConfirm(false)}>No</button>
              </div>
            </div>
          </div>
        )}

        {showCreatedToast && (
          <div className="toast toast-top top-30">
          <div className="alert alert-success">
            <span>Note Created Succesfully</span>
          </div>
        </div>
        )}
        {showEditedToast && (
          <div className="toast toast-top top-30">
          <div className="alert alert-info">
            <span>Note Edited Succesfully</span>
          </div>
        </div>
        )}
        {showDeletedToast && (
          <div className="toast toast-top top-30">
          <div className="alert alert-error">
            <span>Note Deleted Succesfully</span>
          </div>
        </div>
        )}

    </div>
  )
}

export default Home
