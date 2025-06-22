import React, { useState } from 'react'
import axios from '../axios';
import { useNavigate ,Link} from 'react-router-dom';
const Register = () => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [contact,setContact] = useState("");
    const [profile_image,setProfile_image] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("username",username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("contact", contact);
        formData.append("profile_image", profile_image);


        
        try {
          
            const response = await axios.post('/auth/register',formData);
            
            if(response.status === 200){
                navigate('/login');
            }
            else if(response.data.message === "User Already Exists"){
                setMessage("User Already Exists");
            }

        } catch (error) {
              setMessage("Username Already Exists",error);
            }
    }

  return (
    <div className='flex flex-col items-center justify-center h-[90vh] mt-16 '>
      <h1 className='text-3xl font-bold mb-10'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-100 gap-5 border border-primary p-10'>

        <input className='input ' type="text" name="username" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
        <input className='input ' type="email" name="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
        <input className='input ' type="password" name="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <input className='input ' type="number" name="contact" placeholder='Contact' onChange={(e)=>setContact(e.target.value)} />
        <input className='file-input file-input-primary' type="file" name="profile_image" onChange={(e)=>setProfile_image(e.target.files[0])} />
        <button type="submit" className='btn btn-primary'>Register</button>
        <p className="">Already have an Account ?<Link to={'/login'}><span className="text-info ml-4  ">Sign In</span></Link></p>
        <p className='text-error'>{message}</p>
      </form>
    </div>
  )
}

export default Register
