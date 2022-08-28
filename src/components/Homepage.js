import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from 'uid';
import { set, ref } from "firebase/database";

export default function Homepage() {
    const [todo, setTodo] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(!user){
                navigate('/');
            }
        })
    })

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/")})
        .catch(err => {
            alert(err.message)});
    }

    // create

    const writeToDatabase = () => {
        const uid = uid(); 
        set(ref(db, `/${auth.currentUser.uid}/${uid}` ), {
            todo: todo,
            uid: uid
        });
    };

    // read
    // update
    // delete

    return (
        <div>
            <input type="text" placeholder="Add Todo..." value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button onClick={ writeToDatabase }>Add To Do</button>
        
            <button onClick={ handleSignOut }>Sign Out</button>
        </div>
    )
}