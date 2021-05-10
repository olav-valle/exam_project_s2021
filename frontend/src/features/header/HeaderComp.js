import React, {useState} from 'react';
import '../../App.css';
import {Link} from "react-router-dom";
import {useMediaQuery} from 'react-responsive'

function HeaderComp() {

    const [menuState, setMenuState] = useState(false);

    const isSmallScreen = useMediaQuery({query: '(max-width: 1024px)'})

    const toggleMenuOnClick = (e) => {
        // e.preventDefault();
        // when shown, attach document listener
        // when hidden, detach doc listener
        setMenuState(!menuState);

        if(!menuState){
            e.stopPropagation()

            document.removeEventListener('click', closeMenu);
        }
        if (menuState) {
            e.stopPropagation()
            document.addEventListener('click', closeMenu);
        }
    }
    const closeMenu = ()=> {
        setMenuState(false);
    }

    return (
        <nav className="flex justify-center items-center bg-yellow h-20 text-xl">

            <img className="h-16" alt="A logo of a rubber duck silhouette" src="/3135085.png"/>
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
                        title="Link to front page"
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
                        title="Link to shopping cart"
                        className="
                            focus:ring-4
                            focus:ring-gray-300"
                        to='/cart'
                    >
                        Cart
                    </Link>
                </li>
                {isSmallScreen ? null :
                    <React.Fragment>
                        <li>
                            <Link
                                title="Link to login page"
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
                                title="Link to About Us page"
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
                                title="Link to site administration panel"
                                className="
                            focus:ring-4
                            focus:ring-gray-300"
                                to='/admin'
                            >
                                Admin
                            </Link>
                        </li>
                    </React.Fragment>
                }
            </ul>

            {isSmallScreen ?
                <div
                    className="relative"
                >
                    <button
                        aria-label="Drop down navigation menu"
                        aria-roledescription="button"
                        aria-haspopup="menu"
                        aria-expanded={menuState}
                        onClick={toggleMenuOnClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-light" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    {menuState ?
                        <ul
                            aria-roledescription="menu"
                            onClick={toggleMenuOnClick}
                            className="
                            p-4
                            rounded
                            shadow
                            absolute right-0 z-10
                            min-w-min
                            bg-yellow border
                            flex flex-col
                            children:border-b-4
                            children:border-yellow
                            children:hover:text-blue-light
                            children:hover:border-blue-light"
                        >
                            <li>
                                <Link
                                    title="Link to login page"
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
                                    title="Link to About Us page"
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
                                    title="Link to site administration panel"
                                    className="
                            focus:ring-4
                            focus:ring-gray-300"
                                    to='/admin'
                                >
                                    Admin
                                </Link>

                            </li>
                        </ul>
                        : null
                    }
                </div>
                : null
            }
        </nav>
    );
}

export default HeaderComp;