import React, {useState} from 'react';
import {SERVER, LOGIN} from '../../config'
import {loginUser} from "../../app/client";

function LoginComp() {

    //todo: tailwind this thing so it looks like everythign else.

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChange = e => {
        setUsername(e.target.value);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
    }

    const onSubmit = async () => {
        const loginAttemptStatus = await loginUser(username, password);

        if (loginAttemptStatus === 200) {


        }


    }

    const submitButtonEnable = (!!username && !!password);

    return (
        <div
            className="form-signin"
            onKeyDown={(e) => submitButtonEnable ? e.key : e.key !== 'Enter'}
        >
            <h2 className="form-signin-heading">Please sign in</h2>
            <p>
                <label htmlFor="username" className="sr-only">Username</label>
                <input type="text" id="username" name="username" className="form-control" placeholder="Username"
                       required="" autoFocus="" onChange={onUsernameChange}/>
            </p>
            <p>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                       required="" onChange={onPasswordChange}/>
            </p>
            <button className="btn btn-lg btn-primary btn-block" disabled={submitButtonEnable ? "":"disabled"} onClick={onSubmit}>Sign in
            </button>
        </div>
    );
}

export default LoginComp;