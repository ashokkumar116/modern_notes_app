import React, { useContext, useState } from 'react'
import { OtpContext } from '../utils/OtpContext';
import { useNavigate } from 'react-router-dom';

const PassReset = () => {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [message,setMessage] = useState(null);
    const {passReset,loading} = useContext(OtpContext);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(password === confirmPassword){
            
        try {
            const success = await passReset(password);
            if(success){
                navigate('/login');
            }
        } catch (error) {
           setMessage("error");
        }
        }

        setMessage("Password don't Match");

    }
  return (
    <div className='mt-30 flex flex-col h-[80vh] justify-center items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col border border-primary p-7 rounded-md gap-5'>

        <h1 className='text-center font-bold'>PASSWORD RESET</h1>

        <input className='input input-primary w-100' placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input className='input input-primary w-100' placeholder="Confirm Password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} />
        {
            loading ? (
                <button disabled={true} className='btn btn-primary' type="submit">Please Wait <span className="loading loading-spinner loading-sm"></span></button>
            ):(
                <>
                <button className='btn btn-primary' type="submit">Reset Password</button>
                </>
            )
        }
        {message && <p className='text-error text-center'>{message}</p>}

      </form>
    </div>
  )
}

export default PassReset
