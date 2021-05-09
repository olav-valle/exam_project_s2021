import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";

function HeaderComp() {
    return (
        <nav className="flex justify-center items-center bg-yellow h-20 text-xl">
            <h3>Logo?</h3>
            <ul className="nav-links w-1/2 flex justify-around items-center list-none text-black children:hover:text-blue-light">
                <li className="">
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/shop'>Shop</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                
            </ul>
        </nav>
    );
}

export default HeaderComp;