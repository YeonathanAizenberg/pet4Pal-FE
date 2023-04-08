import React, { useState, useEffect } from 'react';
import { getUserById, getPetByOwner } from '../lib/api';
import { useParams } from "react-router-dom";

const UsersPage = () => {
    let id = useParams()
    const [user, setUser] = useState("");
    const [userPets, setUserPets] = useState("");
    const [havePets, setHavePets] = useState(false);
    const [numOfPets, setNumOfPets] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        const result = await getUserById(id.id, localStorage.getItem('token'))
        const petOwner = await getPetByOwner(id.id, localStorage.getItem('token'))
        setUserPets(petOwner);
        setUser(result);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userPets.pet !== undefined) {
            setNumOfPets(userPets.pet.length)
            setHavePets(true)
        } else {
            setHavePets(false)
        }
    }, [userPets]);
    
    return (
        <>
            <div className="pagesBackgroundColor">
                <h2 className="pageHeaders">USERS PAGE</h2>
                <h5>
                    <h3>User contacts:</h3>
                    <div className="admPageDisplay">
                        <div>Name: {user.firstName}</div>
                        <div>Last Name: {user.lastName}</div>
                        <div>email: {user.email}</div>
                        <div>Phone Number: {user.phoneNumber}</div>
                        <div>role: {user.role}</div>
                        <div>Number of Pets: {userPets.pet && numOfPets}</div>
                    </div>
                </h5>
                <h4>User Pets: </h4>
                <div >
                    {userPets.pet === 0 && <div>User have no Pets</div>}
                    {havePets && <div className="admUserPagePetsDisplay">{userPets.pet.map((pet, index) => {
                        return (
                            <div  key={index}>
                                <ul>
                                    <li className="admCards">
                                        <div className="admCardsItems">
                                            <img src={pet.picture} height="100px" alt="Pet picture" />
                                            <div>name: {pet.name}</div>
                                            <div>adoption status: {pet.adoption_status}</div>
                                            <div>height: {pet.height}</div>
                                            <div>weight: {pet.weight}</div>
                                            <div>type: {pet.type}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                    </div>}
                </div>
            </div>
        </>
    );
}

export default UsersPage;