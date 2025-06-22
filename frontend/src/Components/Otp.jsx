import React, { useContext, useState } from "react";
import { OtpContext } from "../utils/OtpContext";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const { email } = useContext(OtpContext);
    const [message, setMessage] = useState(null);
    const [otp, setOtp] = useState(null);
    const { verifyOtp } = useContext(OtpContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await verifyOtp(otp);
            console.log(success)
            if(success){
                navigate('/passreset');
            }
            else{
                setMessage("OTP is Not Valid or Expired")
            }
        } catch (error) {
            setMessage("OTP is Not Valid or Expired");
        }
    };
    return (
        <div className="mt-30 flex flex-col h-[80vh] justify-center items-center">
            <form onSubmit={handleSubmit} className="border border-primary p-7 rounded-md flex flex-col gap-5 ">
                <h1>Enter OTP</h1>
                <input
                    type="number"
                    className="input input-primary w-100"
                    value={otp}
                    placeholder="OTP"
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Verify OTP
                </button>
                {message && <p className="text-error text-center">{message}</p>}
            </form>
        </div>
    );
};

export default Otp;
