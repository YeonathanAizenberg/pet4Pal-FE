import {Button} from 'react-bootstrap';
import React, { useState } from 'react';
import {getUser} from '../lib/api';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try{
            await getUser(email, password);
            localStorage.setItem('authUser', true);
            window.location.reload();
        }
        catch (error) {
            if(error.response === undefined){
                alert("Make sure your server is running")
            } else {
                alert(error + " " + ":" + " " + error.response.data.errors[0].message)
            }
        }
    }

    return (
        <>
            <br></br>
            <h3>Login: </h3>
            <form className="modalLogIn" onSubmit={handleFormSubmit}>
                <label>
                    Email address:
                        <input type="email" name="email" id="email" onChange={e=> setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                        <input type="password" name="password" id="password" onChange={e=> setPassword(e.target.value)}/>
                </label>
                <Button type="submit">Login</Button>
            </form>
            <br></br>
        </>
    );
}

export default Login;