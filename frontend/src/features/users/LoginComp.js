import React, {useState} from 'react';
import {SERVER, LOGIN} from '../../config'
import {getCurrentUser, loginUser} from "../../app/client";
import {useHistory} from 'react-router-dom'
import {current} from "@reduxjs/toolkit";
import {logToken, tokenParse} from "./UserAuth";
import {userLoggedIn} from "./userSlice";
import {useDispatch} from "react-redux";

function LoginComp() {

    //todo: tailwind this thing so it looks like everythign else.

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const onUsernameChange = e => {
        setUsername(e.target.value);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
    }

    const onSubmit = async () => {
        setLoginFailed(false);
        const loginAttemptStatus = await loginUser(username, password);

        if (loginAttemptStatus === 403) {
            setLoginFailed(true);
        }

        if (loginAttemptStatus === 200) {
            const user = tokenParse();
            dispatch(userLoggedIn(user))
            if (user.role === "ROLE_ADMIN") {
                history.push("/admin");
            }
            if (user.role === "ROLE_CUSTOMER") {
                history.push("/cart");
            }
        }


    }

    const submitButtonEnable = (!!username && !!password);

    return (
        <div
            className="flex flex-col items-center mt-8 mx-auto max-w-2xl children:my-1"
            onKeyDown={(e) => submitButtonEnable ? e.key : e.key !== 'Enter'}
        >
            <h2 className="text-xl">Please sign in</h2>
            {loginFailed ?
                <h3 className="text-lg text-red-500">Invalid Username or Password.</h3> : null}
            <p>
                <label htmlFor="username" className="sr-only">Username</label>
                <input type="text" id="username" name="username"
                       className="
                       p-1
                       shadow
                       {/*border border-transparent */}
                       focus:outline-none focus:ring-2
                       rounded focus-within:shadow-orange"
                       placeholder="Username"
                       required="" autoFocus="" onChange={onUsernameChange}/>
            </p>
            <p>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" name="password"
                       className="
                       p-1
                       shadow
                       focus:outline-none focus:ring-2
                       rounded focus-within:shadow-orange
                       "
                       placeholder="Password"
                       required="" onChange={onPasswordChange}/>
            </p>
            <button
                disabled={submitButtonEnable ? "": "disabled"}
                className="
                disabled:bg-grey-300 disabled:text-grey-500
                text-white text-xl
                shadow
                px-4 py-1
                rounded
                bg-yellow hover:bg-yellow-dark
                focus:shadow-orange focus:ring-2 tab focus:outline-none"
                    onClick={onSubmit}>Sign in
            </button>
        </div>
    );
}

export default LoginComp;