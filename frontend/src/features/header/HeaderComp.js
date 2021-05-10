import React from 'react';
import '../../App.css';
import {Link} from "react-router-dom";

function HeaderComp() {
    return (
        <nav className="flex justify-center items-center bg-yellow h-20 text-xl">

            <h3>Logo?</h3>
            <ul className="
                nav-links
                w-1/2
                flex
                justify-around
                items-center
                list-none
                text-black
                children:border-b-4 
                children:border-yellow
                children:hover:text-blue-light
                children:hover:border-blue-light"
            >
                <li>
                    <Link 
                        className="
                            focus:ring-4
                            focus:ring-gray-300"
                        to='/'
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        className="
                            focus:ring-4
                            focus:ring-gray-300"
                        to='/about'
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link 
                        className="
                            focus:ring-4
                            focus:ring-gray-300"
                        to='/cart'
                    >
                        Cart
                    </Link>
                </li>
                <li>
                    <Link 
                        className="
                            focus:ring-4
                            focus:ring-gray-300"
                        to='/login'
                    >
                        Login
                    </Link>
                </li>
                <li>
                    <Link
                        className="
                            focus:ring-4
                            focus:ring-gray-300"
                        to='/admin'
                    >
                        Admin
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderComp;