import React from 'react';
import Auth from './use-auth';

const Login = () => {
    const auth = Auth();
    console.log(auth.user)
    return (
        <div>
            <h2>Join Party..........</h2>
           { 
            auth.user ? <button onClick={auth.signOut}>Sign Out</button>:
            <button onClick={auth.signInWithGoogle}>Sign In With Google</button>
           }
        </div>
    );
};

export default Login;