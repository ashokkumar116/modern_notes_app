import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import React, { useContext, useState } from 'react'
import { OtpContext } from '../utils/OtpContext';

const ForgotPass = () => {

    const [email,setEmail] = useState("");
    const [message,setMessage] = useState(null);
    const navigate = useNavigate();
    const {sendOtp,loading,error} = useContext(OtpContext);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMessage("");

        try {
            const success = await sendOtp(email);
            if(success){
                navigate('/otp');
            }
            else{
                setMessage(error);
            }

        } catch (err) {
            setMessage("No Users Found In that Email");
        }

    }

  return (
    <div className='mt-30 flex justify-center items-center h-[80vh]'>
      <form onSubmit={handleSubmit} className='border border-primary p-7 rounded-md flex flex-col gap-5 '>
        <h1>Enter Your Email</h1>
        <input type="email" name="email" className='input input-primary w-100' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        {loading ? (
            <>
                <button disabled={true} className='btn btn-primary'>Sending <span className="loading loading-bars loading-sm"></span></button>
            </>
        ) : (
            <>
            <button type='submit' className='btn btn-primary'>Send OTP</button>
            </>
        )}
        {message && <p className='text-error text-center'>{message}</p>}
      </form>
    </div>
  )
}

export default ForgotPass;
