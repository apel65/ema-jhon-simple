import React from 'react';
import Auth from './useAuth';
import { useEffect } from 'react';

const Login = () => {
    const auth = Auth();
    
    // useEffect( () => {
    //     console.log(auth.user)
    // })
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/review';
           
        });
    }

    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/';
        });
    }
  
    return (
        <div>
            <h2>Join Party..........</h2>
           { 
            auth.user ? <button onClick={handleSignOut}>Sign Out</button>:
            <button onClick={handleSignIn}>Sign In With Google</button>
           }
        </div>
    );
};

export default Login;