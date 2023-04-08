import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function PetCards(props) {

    const [modal, setModal] = useState(false);
    const handleModal = () => {
        setModal(false)
    }

    return (
        <div>
            <div>
                <Modal show={modal} onHide={handleModal}>
                    <Modal.Header className="petsModalHeader">
                        name: {props.petName}
                        <img src={props.petImg} height="100px" alt="Pet picture" />
                    </Modal.Header>
                    <Modal.Body className="petsModalBody">
                        <div>{props.petStatus}</div>
                    </Modal.Body>
                    <Modal.Footer className="petsModalHeader">
                        <NavLink exact to={`/MyPets/PetPage/${props.petId}`}>Pet Page</NavLink>
                    </Modal.Footer>
                </Modal>
            </div>
            <li onClick={() => setModal(true)}>
                <img src={props.petImg} height="100px" alt="Pet picture" />
                <div>{props.petName}</div>
                <div>{props.petStatus}</div>
                <NavLink exact to={`/MyPets/PetPage/${props.petId}`}>Pet Page</NavLink>
            </li>
        </div>
    )
}

export default PetCards;