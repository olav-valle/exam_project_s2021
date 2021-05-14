import React from 'react';

function LoginComp() {

    //todo: tailwind this thing so it looks like everythign else.
    return (
        <div>
            <form className="form-signin" method="post" action="/login">
                <h2 className="form-signin-heading">Please sign in</h2>
                <p>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="username" name="username" className="form-control" placeholder="Username"
                           required="" autoFocus=""/>
                </p>
                <p>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                           required=""/>
                </p>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>

        </div>
    );
}

export default LoginComp;