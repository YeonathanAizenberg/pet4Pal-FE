import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';


function PetModal({ pet, isAdvanceSearchBtn, isUser }) { // destructor (prop.pets)

    const [modal, setModal] = useState(false);
    const handleModal = () => {
        setModal(false)
    }

    return (
        <div>
            <ul>
                <li>
                    <Modal show={modal} onHide={handleModal}>
                        <Modal.Header className="petsModalHeader">
                            name: {pet.name}
                            <img src={pet.picture} height="100px" />
                        </Modal.Header>
                        <Modal.Body className="petsModalBody">
                            <div>{isAdvanceSearchBtn && "adoption status:"} {isAdvanceSearchBtn && pet.adoption_status}</div>
                            <div>{isAdvanceSearchBtn && "height:"} {isAdvanceSearchBtn && pet.height}</div>
                            <div>{isAdvanceSearchBtn && "weight:"} {isAdvanceSearchBtn && pet.weight}</div>
                            <div>type: {pet.type}</div>
                        </Modal.Body>
                        <Modal.Footer className="petsModalHeader">
                            <NavLink exact to={`/${isUser}/PetPage/${pet.id}`}>Pet Page</NavLink>
                        </Modal.Footer>
                    </Modal>
                    <button className="petsCards" onClick={() => setModal(true)}>
                        <div >
                            <div>name: {pet.name}</div>
                            <img src={pet.picture} height="100px" />
                            <div>{isAdvanceSearchBtn && "adoption status:"} {isAdvanceSearchBtn && pet.adoption_status}</div>
                            <div>{isAdvanceSearchBtn && "height:"} {isAdvanceSearchBtn && pet.height}</div>
                            <div>{isAdvanceSearchBtn && "weight:"} {isAdvanceSearchBtn && pet.weight}</div>
                            <div>type: {pet.type}</div>
                            <NavLink exact to={`/${isUser}/PetPage/${pet.id}`}>Pet Page</NavLink>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default PetModal;