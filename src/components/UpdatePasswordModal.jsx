import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { updateUserPasswordById } from '../lib/api';


function UpdatePasswordModal() {

    const [currentPass,setCurrentPass] = useState("");
    const [newPass,setNewPass] = useState("");

    let id = localStorage.getItem('userID');
    const [modal, setModal] = useState(false);
    const handleModal = () => {
        setModal(false)
    }

const handleFormSubmit = async  (event) => {
    event.preventDefault();
    try{
        await updateUserPasswordById(id, currentPass, newPass, localStorage.getItem('token'));
        alert("Your Password has been changed!")
    } catch (error) { 
        if(error.response.statusText) {
            alert("Please make sure to full fill all the fields with the CORRECT information")
        }
    }
        setModal(false)
    }

    return (
        <div>
            <Modal show={modal} onHide={handleModal}>
                <Modal.Header className="petsModalHeader">
                    Update Password:
                </Modal.Header>
                <Modal.Body className="petsModalBody">
                    <form onSubmit={handleFormSubmit}>
                        <label>
                        <input type="password" name="currentPassword" id="currentPassword" placeholder={"Current password"} onChange={e=> setCurrentPass(e.target.value)}/>
                        </label>
                        <label>
                        <input type="password" name="newPassword" id="newPassword" placeholder={"New password"} onChange={e=> setNewPass(e.target.value)}/>
                        </label>
                        <Button type="submit">Save</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer className="petsModalHeader">
                    Don't share your password !
                </Modal.Footer>
            </Modal>
            <button className="petsCards" onClick={() => setModal(true)}> Update Your Password </button>
        </div>
    );
}

export default UpdatePasswordModal;