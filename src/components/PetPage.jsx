import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { getPetById, adoptPet, addPetsByUserId, getPetsByUserId, removePetsByUserId } from '../lib/api';

function PetPage(props) {
    let id = useParams();
    const [pet, setPet] = useState("");
    const [saveOrUnsave, setSaveOrUnsave] = useState("save");
    const [savedPet, setSavedPet] = useState("");
    const [owner, setOwner] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const thisPet = await getPetById(id);
            setPet(thisPet);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const saved = await getPetsByUserId(id, localStorage.getItem("userID"), localStorage.getItem("token"));
            setSavedPet(saved)
            console.log(saved)
            if (saved.pets.length === 0) {
                setSaveOrUnsave("save")
            } else {
                setSaveOrUnsave("false")
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (pet.owner_id === localStorage.getItem("userID")) {
            setOwner(true)
        } else {
            setOwner(false)
        }
    }, [pet]);

    const returnPet = async () => {
        await adoptPet(id, "00000", "available", localStorage.getItem('token'));
        window.location.reload();
    }

    const letAadoptPet = async () => {
        await adoptPet(id, localStorage.getItem("userID"), "adopted", localStorage.getItem('token'));
        window.location.reload();
    }

    const fosterPet = async () => {
        await adoptPet(id, localStorage.getItem("userID"), "foster", localStorage.getItem('token'));
        window.location.reload();
    }

    const savedFotLater = async () => {
        try {
            if (saveOrUnsave === "false") {
                await removePetsByUserId(id, localStorage.getItem("userID"), localStorage.getItem('token'))
                return setSaveOrUnsave("save")
            } else {
                await addPetsByUserId(id, localStorage.getItem("userID"), localStorage.getItem('token'));
                setSaveOrUnsave("false");
            }
        } catch (error) {
            alert(error + " " + ":" + " " + error.response.data.message)
        }
    }

    return (
        <>
            <div className="pagesBackgroundColor">
                <div className="pageHeaders">
                    <h3>PetPage</h3>
                </div>
                <div className="petPageContainer">
                    <span className="petPageOne">
                        <div>Type: {pet.type}</div>
                        <div>Name: {pet.name}</div>
                        <div>Adoption Status: {pet.adoption_status}</div>
                        <div>Height: {pet.height}</div>
                        <div>Weight: {pet.weight}</div>
                    </span>
                    <div className="image-container">
                        <img src={pet.picture} />
                    </div>
                    <span className="petPageTwo">
                        <div>Color: {pet.color}</div>
                        <div>Bio: {pet.bio}</div>
                        <div>Hypoallergenic: {pet.hypoallergenic && "Yes" || !pet.hypoallergenic && "No"}</div>
                        <div>dietary restrictions: {pet.dietary_restrictions}</div>
                        <div>breed of animal:  {pet.breed_of_animal}</div>
                    </span>
                </div>
                <div className="userBtns">
                    {props.userautho && owner && <button onClick={returnPet}>Returning the Pet</button>}
                    {props.userautho && (pet.adoption_status === "available" || pet.adoption_status === "Available") && !owner && <button onClick={letAadoptPet}>adopt</button>}
                    {props.userautho && savedPet && <button onClick={savedFotLater} className={saveOrUnsave}>Save for later/Unsave for later</button>}
                    {props.userautho && (pet.adoption_status === "available" || pet.adoption_status === "Available") && !owner && <button onClick={fosterPet}>foster</button>}
                </div>
            </div>
        </>
    )
}

export default PetPage;