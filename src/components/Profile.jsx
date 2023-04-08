import {Button} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { updateUserById, getUserByIdForUser } from '../lib/api';
import UpdatePasswordModal from './UpdatePasswordModal';

function Profile() {

    let id = localStorage.getItem('userID');
    let currentEmail = localStorage.getItem('userEmail');
    const [user, setUser] = useState("");
    const [email,setEmail] = useState("");
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [phone,setPhone] = useState("");
    const [bio,setBio] = useState("");

    useEffect(() => {
        const fetchData = async () => {
        const result = await getUserByIdForUser(id, localStorage.getItem('token'))
        setUser(result);
    };
    fetchData();
    }, []);
    useEffect(() => {
    setEmail(user.email);
    setFname(user.firstName);
    setLname(user.lastName);
    setPhone(user.phoneNumber);
    setBio(user.bio);
}, [user]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
        await updateUserById(id ,email, fname, lname, (phone*1), bio , currentEmail, localStorage.getItem('token'));
        localStorage.setItem('userFirstName', fname);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhoneNumber', phone);
        localStorage.setItem('userLastName', lname);
        window.location.reload();
        } catch (error) {
            if(error.response.data.message){
                alert(error.response.data.message)
            } else  {
                alert(error + " " + ":" + " " + error.response.data.errors[0].message)
            }
        }
    }

    return (
        <>
        <div className="pagesBackgroundColor">
            <div className="pageHeaders">
                <br></br>
                <h3>Profile :</h3>
            </div>
            <div>
                <UpdatePasswordModal/>
            </div>
            <form className="profileDisplay" onSubmit={handleFormSubmit}>
                <label>
                    Email address: 
                        <input type="email" name="email" id="email" placeholder={user.email} onChange={e=> setEmail(e.target.value)}/>
                </label>
                <label>
                    First Name:
                        <input type="text" name="firstName" placeholder={user.firstName} id="firstName" onChange={e=> setFname(e.target.value)}/>
                </label>
                <label>
                    Last Name: 
                        <input type="text" name="lastName" id="lastName" placeholder={user.lastName} onChange={e=> setLname(e.target.value)}/>
                </label>
                <label>
                    Phone number:
                        <input type="number" name="phoneNumber" id="phoneNumber" placeholder={user.phoneNumber} onChange={e=> setPhone(e.target.value)}/>
                </label>
                <label>
                    Short Bio:
                        <textarea maxLength="50" type="text" name="shortBio" id="shortBio" placeholder={user.bio} onChange={e=> setBio(e.target.value)}/>
                </label>
                <Button type="submit">Save</Button>
            </form>
            <br></br>
        </div>
        </>
    );
}

export default Profile;