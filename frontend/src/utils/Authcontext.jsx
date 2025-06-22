import axios from "../axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);


    const fetchUser =async () =>{
        try {
            const data = await axios.get('/auth/me',{withCredentials:true});
            setUser(data.data);
        } catch (error) {
            console.log(err);
        }
        finally{
            setLoading(false)
        }
    }

    const login = async (values) =>{
        console.log(values);
        const response = await axios.post('/auth/login',values,{withCredentials:true});
        console.log(response);
        try {
            if(response.status === 200){
                fetchUser();
                return true
            }
            return false
        } catch (error) {
            setUser(null);
        }
        finally{
            setLoading(false);
        }
    }

    const logout = async () =>{
        try {
            await axios.post('/auth/logout',{withCredentials:true});
            setUser(null);
        } catch (error) {
            setUser(null);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])

    return <AuthContext.Provider value={{user,login,logout,loading,fetchUser}}>{children}</AuthContext.Provider>

}
