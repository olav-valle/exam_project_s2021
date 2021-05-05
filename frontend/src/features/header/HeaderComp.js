import React from 'react';
import '../../App.css';
import { Link } from "react-router-dom";

function HeaderComp() {
    return (
        <nav>
            <h3>Logo?</h3>
            <ul className="nav-links">
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/about'>
                <li>About</li>
                </Link>
                <Link to='/shop'>
                    <li>Shop</li>
                </Link>
                <Link to='/login'>
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    );
}

export default HeaderComp;