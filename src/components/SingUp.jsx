import {Button} from 'react-bootstrap';
import React, { useState } from 'react';
import {createUser} from '../lib/api';

const SingUp = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConf,setpasswordConf] = useState("");
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [phone,setPhone] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password !== passwordConf) {
                alert("Passwords don't match");
            } else {
            await createUser(email, password, fname, lname, (phone*1));
            localStorage.setItem('authUser', true);
            window.location.reload();
        }} catch (error) {
                if(error.response === undefined){
                alert("Make sure your server is running")
            } else {
                alert(error + " " + ":" + " " + error.response.data.errors[0].message)
            }
        }};

    return (
        <>
            <br></br>
            <h3>SignUp :</h3>
            <form className="modalSingUp" onSubmit={handleFormSubmit}>
                <label>
                    Email address:
                        <input type="email" name="email" id="email" onChange={e=> setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                        <input type="password" name="password" id="password" onChange={e=> setPassword(e.target.value)}/>
                </label>
                <label>
                    Password Confirmation:
                        <input type="password" name="passwordConf" id="passwordConf" onChange={e=> setpasswordConf(e.target.value)}/>
                </label>
                <label>
                    First Name:
                        <input type="text" name="firstName" id="firstName" onChange={e=> setFname(e.target.value)}/>
                </label>
                <label>
                    Last Name:
                        <input type="text" name="lastName" id="lastName" onChange={e=> setLname(e.target.value)}/>
                </label>
                <label>
                    Phone number:
                        <input type="number" name="phoneNumber" id="phoneNumber" onChange={e=> setPhone(e.target.value)}/>
                </label>
                <Button type="submit">SingUp</Button>
            </form>
            <br></br>
        </>
    );
}

export default SingUp;