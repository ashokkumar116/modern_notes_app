import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/Authcontext";
import { Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting values:", values);

        try {
            const success = await login(values);
            if (success) {
                navigate("/home");
            } else {
                setMessage("Login Failed");
            }
        } catch (error) {
            setMessage("Login Failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] mt-16">
            <h1 className="text-3xl mb-10 font-bold">LOGIN</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-100 gap-8 items-center justify-center border border-primary p-10">
                <input
                    className="input"
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    onChange={handleChange}
                    required
                />
                <input
                    className="input"
                    type="password" 
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <Link to={'/forgotPass'}>Forgot Password ?</Link>
                <button className="btn btn-primary w-50" type="submit">Login</button>
                <p className="">Dont have an Account ?<Link to={'/register'}><span className="text-info ml-4  ">Sign Up</span></Link></p>
                {message && <p className="text-error">{message}</p>}
            </form>
        </div>
    );
};


export default Login;
