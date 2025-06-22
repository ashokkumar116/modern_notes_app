import { createContext, useState } from "react";
import axios from "../axios";

export const OtpContext = createContext();

export const OtpContextProvider = ({children}) =>{
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const sendOtp = async(email) =>{
        try {
            setLoading(true);
            console.log(email);
            const response = await axios.post('/auth/sendotp',{email});
            console.log(response);
            setEmail(email);
            if(response.status === 200){
                return true;
            }
            else{
                setError(response.data.message);
                return false;
            }
        } catch (error) {
            setError(response.data.message);
            return false;
            
        }
        finally{
            setLoading(false);
        }
    }

    const verifyOtp = async (otp)=>{
        try {
            const response = await axios.post('/auth/verifyotp',{email,otp});
            if(response.status === 200){
                return true;
            }
            else if(response.status === 400){
                return false;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const passReset = async(password)=>{
        try {
            setLoading(true);
            const response = await axios.put('/auth/passreset',{email,password});
            if(response.status === 200){
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
        finally{
            setLoading(false);
        }
    }



    return <OtpContext.Provider value = {{sendOtp,loading,email,error,verifyOtp,passReset}}>{children}</OtpContext.Provider>
}
