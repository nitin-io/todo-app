import React, { useState, useEffect }from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import { signedOut } from 'firebase/auth';


export default function Welcome() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [isRegistering, setIsRegistering] = useState(false);
        const {registerInformation, setRegisterInformation} = {
            email: '',
            confirmEmail: '', 
            password: '',
            confirmPassword: ''
        }

        const navigate = useNavigate();

        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                if(user) {
                    navigate('/homepage');
                }
            })
        })

        const handleEmailChange = (e) => {
            setEmail(e.target.value);
        }

        
        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        }

        const handleSignIn = () => {
            signInWithEmailAndPassword(auth, email, password).catch((err) => alert(err.message));
            navigate("/homepage");
        }

        const handleRegister = () => {
            if(registerInformation.email !== registerInformation.confirmEmail){
                alert("Please confirm both email are same.")
            }
            else if(registerInformation.password !== registerInformation.confirmPassword)
            createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password).catch((err) => alert(err.message));
            navigate("/homepage");
        };

    return (
               <div className="welcome">
        <h1>ToDo App</h1>
        <div className="login-register-container">
            {isRegistering ? (
                <> 
                <input type="email"
                placeholder="Email" 
                value={registerInformation.email} 
                onChange={(e) => setRegisterInformation(
                    {...registerInformation,
                        email: e.target.value}
                    )} />

                <input type="email"
                 placeholder="Confirm Email" 
                 value={registerInformation.confirmeEmail}
                 onChange={(e) => setRegisterInformation(
                    {...registerInformation,
                        confirmEmail: e.target.value}
                    )} />

                <input type="password"
                placeholder="Password"
                value={registerInformation.password}
                onChange={(e) => setRegisterInformation(
                    {...registerInformation,
                        password: e.target.value}
                    )} />

                <input type="password" 
                placeholder="Confirm Password" 
                value={registerInformation.confirmPassword} 
                onChange={(e) => setRegisterInformation(
                    {...registerInformation,
                        confirmPassword: e.target.value}
                    )} />

                <button onClick={ handleRegister }>Register</button>
                <button onClick={() => setIsRegistering(false)}>Go Back To Sign In</button>
                </>
                ) : (
                    <> 
                    <input type="email" onChange={ handleEmailChange } value={email} />
                    <input type="password" onChange={ handlePasswordChange } value={password} />
                    <button onClick={ handleSignIn }>Sign In</button>
                    <button onClick={() => setIsRegistering(true)}>Create An Account</button>
                    </>
                )

            }
        <button onClick={() => setIsRegistering(true)}> </button> 
      </div>
      </div>
    )
}