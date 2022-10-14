import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';


const Navbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth);
        navigate("/");
    };

    const [user, loading, error] = useAuthState(auth);
    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">New</Link></li>
        <li><Link to="/logistics">Logistics</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li>{user ? <div> <small className='font-bold text-orange-400'>{user.displayName.split(" ")} </small> <button onClick={logout} className="btn btn-ghost text-red-800">Logout</button> </div> : <Link to="/login">Login</Link>}</li>

    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl"> FoodChain</a>
                </div>
              
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;