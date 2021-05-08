import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";

function HeaderComp() {
    return (
        <nav className="flex justify-center items-center bg-yellow h-20 text-xl">


            <ul className="nav-links w-1/2 flex justify-around items-center list-none text-black children:hover:text-blue-light">
                <Link to='/'>
                    <li className="">Home</li>
                </Link>
                <Link to='/about'>
                <li>About</li>
                </Link>
                <Link to='/cart'>
                    <li>Cart</li>
                </Link>
                <Link to='/login'>
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    );
}

export default HeaderComp;