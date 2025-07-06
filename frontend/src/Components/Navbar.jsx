import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/Authcontext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        logout();
    };
    return (
        <div className="navbar flex justify-between p-4 items-center fixed top-0 bg-primary z-3">
            <div className="logo">
                <h1 className="text-2xl font-bold">NOTES APP</h1>
            </div>
            <div className="flex items-center justify-center gap-5">
                {user ? (
                    <>
                        <Link to={"/home"} >HOME</Link>
                        
                        <div className="dropdown dropdown-end bg-indigo-900 p-2 rounded-full">
                        <span>{user.username.toUpperCase()}&nbsp;&nbsp;</span>
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user.profile_image ? `https://modern-notes-app-zeiy.onrender.com${user.profile_image}` : `http://localhost:5000/uploads/default.webp` }
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-50 p-2 shadow"
                            >
                                <li>
                                    <Link to={'/profile'} className="text-md">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <a className="text-md" onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to={"/login"}>LOGIN</Link>
                        <Link to={"/register"}>REGISTER</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
