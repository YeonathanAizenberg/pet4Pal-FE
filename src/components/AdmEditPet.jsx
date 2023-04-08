import {Button} from 'react-bootstrap';
import React, { useState,useEffect } from 'react';
import { getPetById, updatePetById, updatePetPicture } from '../lib/api';
import {useParams } from "react-router-dom";

const AdmEditPet = () => {

    let id = useParams();
    const [pet, setPet] = useState("");

    const [type,setType] = useState("");
    const [name,setName] = useState("");
    const [status,setStatus] = useState("");
    const [image,setImage] = useState("");
    const [newImage,setNewImage] = useState(null);
    const [height,setHeight] = useState(""); 
    const [weight,setWeight] = useState(""); 
    const [color,setColor] = useState(""); 
    const [bio,setBio] = useState(""); 
    const [hypo,setHypo] = useState(""); 
    const [dietary,setDietary] = useState(""); 
    const [breed,setBreed] = useState(""); 
    
    useEffect(() => {
        const fetchData = async () => {
        const result = await getPetById(id)
        setPet(result);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
    setHypo(pet.hypoallergenic);
    setType(pet.type);
    setName(pet.name);
    setStatus(pet.adoption_status);
    setImage(pet.picture);
    setHeight(pet.height);
    setWeight(pet.weight);
    setColor(pet.color);
    setBio(pet.bio);
    setDietary(pet.dietary_restrictions);
    setBreed(pet.breed_of_animal);
}, [pet]);

if (typeof hypo === "string" || typeof hypo === "number") {
    if (hypo === "true" || 1)  setHypo(true);
    if (hypo === "false"|| 0) setHypo(false);
}

    const saveChanges = async (event) => {
        event.preventDefault();
        try {
            if(newImage !== null) {
                const petPictureURL = await updatePetPicture(newImage, localStorage.getItem('token'));
                await updatePetById(id,type, name, status, petPictureURL, (height*1), (weight*1), color, bio, hypo, dietary, breed, localStorage.getItem('token'));
                window.location.reload();
            } else {
                await updatePetById(id,type, name, status, image, (height*1), (weight*1), color, bio, hypo, dietary, breed, localStorage.getItem('token'));
                window.location.reload();
            }
        } catch (error) {
            if(error.response.data.message){
                alert(error.response.data.message)
            } else {
                alert(error.response.data.errors[0].message)
            }
        }
    };

    return (
        <>
        <div className="pagesBackgroundColorTwo"> 
        <div className="pageHeaders">
            <h3>Edit Pate Page</h3>
        </div>
            <form className="admPageDisplay editPetPage" onSubmit={saveChanges}>
                <div>
                    Type:
                    <input type="radio" id="dog" placeholder={pet.type} name="type" value="dog" onChange={e=> setType(e.target.value)}/>
                    <label for="dog">Dog</label>
                    <input type="radio" id="cat" name="type" value="cat" onChange={e=> setType(e.target.value)}/>
                    <label for="cat">Cat</label>
                    , currently he/she is a <b><u>{pet.type}</u></b>
                </div>
                <div>
                    <label>
                        Name: 
                        <input type="text" placeholder={pet.name} name="name" id="name" onChange={e=> setName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    Adoption Status:
                    <input type="radio" id="Adopted" name="status" value="Adopted" onChange={e=> setStatus(e.target.value)}/>
                    <label for="Adopted">Adopted</label>
                    <input type="radio" id="Fostered" name="status" value="Fostered" onChange={e=> setStatus(e.target.value)}/>
                    <label for="Fostered">Fostered</label>
                    <input type="radio" id="Available" name="status" value="Available" onChange={e=> setStatus(e.target.value)}/>
                    <label for="Available">Available</label>
                    , currently he/she is <b><u>{pet.adoption_status}</u></b>
                </div>
                <div>
                    <label className='pet-img-wrapper'>
                        Picture: <img src={pet.picture} height="100px" alt="petImg"/>
                        <input type="file" name="image" id="image" onChange={e=> setNewImage(e.target.files[0])}/>
                    </label>
                </div>
                <div>
                    <label>
                        Height: 
                        <input type="number" placeholder={pet.height} name="height" id="height" onChange={e=> setHeight(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Weight: 
                        <input type="number"  placeholder={pet.weight} name="weight" id="weight" onChange={e=> setWeight(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Color: 
                        <input type="text" placeholder={pet.color} name="color" id="color" onChange={e=> setColor(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Bio: 
                        <textarea maxLength="50" placeholder={pet.bio} type="text-area" placeholder={pet.bio} name="bio" id="bio" onChange={e=> setBio(e.target.value)}/>
                    </label>
                </div>
                <div>
                    Hypoallergenic: 
                    <input type="radio" id="True" name="hypo" value="true" onChange={e=> setHypo(e.target.value)}/>
                    <label for="True">True</label>
                    <input type="radio" id="False" name="hypo" value="false" onChange={e=> setHypo(e.target.value)}/>
                    <label for="False">False</label>
                    , currently he/she got <b><u>{pet.hypoallergenic && "Yes" || !pet.hypoallergenic && "No"}</u></b> for Hypoallergenic
                </div>
                <div>
                    <label>
                        Dietary restrictions: 
                        <textarea maxLength="50" placeholder={pet.dietary_restrictions} type="text" name="dietary" id="dietary" onChange={e=> setDietary(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Breed of animal: 
                        <input type="text" name="breed" placeholder={pet.breed_of_animal} id="breed" onChange={e=> setBreed(e.target.value)}/>
                    </label>
                </div>
                <Button type=  "submit">Save Changes</Button>
            </form>
        </div>
        </>
    );
}

export default AdmEditPet;