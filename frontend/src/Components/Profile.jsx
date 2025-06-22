import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/Authcontext";

import axios from "../axios";

const Profile = () => {
    const { user ,fetchUser} = useContext(AuthContext);
    const [showEdit, setShowEdit] = useState(false);
    const [showEditImage, setShowEditImage] = useState(false);
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [contact,setContact] = useState(null);
    const [profileImage,setProfileImage] = useState(null);
    const [showEditedToast,setShowEditedToast] = useState(false);
    const [showProfileEditedToast,setShowProfileEditedToast] = useState(false);

    const handleEdit = (e) =>{
        setShowEdit(true);
        setUserName(user.username);
        setEmail(user.email);
        setContact(user.contact);
    }

    const handleEditSave = async(e)=>{
        e.preventDefault();
        await axios.put('/auth/editprofile',{username,email,contact});
        setShowEdit(false);
        await fetchUser();
        setShowEditedToast(true);
        setTimeout(() => {
            setShowEditedToast(false);
        }, 3000);
    }

    const hanldeProfileUpload =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile_image",profileImage);

        try {   
            
            await axios.put('/auth/profile_upload',formData);
            fetchUser();

        } catch (error) {
            console.log(error);
        }
        finally{
            setShowEditImage(false);
        }
        setShowProfileEditedToast(true);
        setTimeout(() => {
            setShowProfileEditedToast(false);
        }, 3000);
    }

    return (
        <div className="flex flex-col justify-center items-center mt-30">
            <div className="card border border-indigo-600 p-10 shadow-sm flex flex-col items-center justify-center">
                <h1 className="card-title">PROFILE</h1>
                <div className="card-body flex flex-col items-center justify-center gap-5">
                    <img
                        className="avatar rounded-full w-30 h-30 ring-primary ring-offset-base-100 ring-2 ring-offset-2"
                        src={
                            user.profile_image
                                ? `http://localhost:5000${user.profile_image}`
                                : `http://localhost:5000/uploads/default.webp`
                        }
                        alt=""
                    />
                    <p>Name : {user.username.toUpperCase()}</p>
                    <p>Email : {user.email}</p>
                    <p>Contact : {user.contact}</p>
                    <button
                        onClick={handleEdit}
                        className="btn btn-info"
                    >
                        Edit Profile
                    </button>
                    <button
                        className="btn btn-info"
                        onClick={(e)=>setShowEditImage(true)}
                    >
                        Edit Profile Image
                    </button>
                </div>
            </div>
                        {showEdit && (
                            <div className="editModal mb-5 fixed top-0 bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%]">

                            <form className="animate-popup fixed top-0 z-50 top-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center rounded-md bg-gray-800 p-10" onSubmit={handleEditSave}>
                                <input className="input input-primary" type="text" name="username" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                                <input className="input input-primary" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                <input className="input input-primary" type="number" name="contact"value={contact} onChange={(e)=>setContact(e.target.value)} />
                                <button className="btn btn-info">Update Profile</button>
                                <button className='btn btn-error' onClick={()=>setIsEditing(false)}>Cancel</button>
                            </form>

                            </div>
                        )}
                        {showEditImage && (
                            <div className="editModal mb-5 fixed top-0 z-50 bg-[rgba(0,0,0,0.6)] w-[100%] h-[100%]">
                            <form onSubmit={hanldeProfileUpload} className="animate-popup absolute top-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center rounded-md bg-gray-800 p-10">
                                <input className="file-input file-input-primary" type="file" name="profile_image" onChange={(e)=>setProfileImage(e.target.files[0])}/>
                                <button type="submit" className="btn btn-info">Update Profile Picture</button>
                                <button className='btn btn-error' onClick={()=>setShowEditImage(false)}>Cancel</button>
                            </form>
                            </div>
                        )

                        }
                        {showEditedToast && (
                            <div className="toast toast-top top-30">
                            <div className="alert alert-success">
                                <span>Profile Updated Succesfully</span>
                            </div>
                            </div>
                            )}
                        {showProfileEditedToast && (
                            <div className="toast toast-top top-30">
                            <div className="alert alert-success">
                                <span>Profile Picture Updated Succesfully</span>
                            </div>
                            </div>
                            )}
        </div>
    );
};

export default Profile;
