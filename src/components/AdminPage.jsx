import {Button} from 'react-bootstrap';
import UsersCards from './UsersCards';
import AdmPetCards from './AdmPetsCards';
import React, { useState } from 'react';
import {createPet, updatePetPicture} from '../lib/api';

function Admin (props) {

    const [type,setType] = useState(null);
    const [name,setName] = useState(null);
    const [status,setStatus] = useState(null);
    const [image,setImage] = useState(null);
    const [height,setHeight] = useState(null); 
    const [weight,setWeight] = useState(null); 
    const [color,setColor] = useState(null); 
    const [bio,setBio] = useState(null); 
    const [hypo,setHypo] = useState(false); 
    const [dietary,setDietary] = useState(null); 
    const [breed,setBreed] = useState(null); 

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try{
            if(type === null|| name === null|| status=== null|| image === null|| height === null|| weight === null|| color === null|| hypo === null|| dietary === null|| breed === null) {
                alert("Please Fulfill the required components")
            } else {
            const petPictureURL = await updatePetPicture(image, localStorage.getItem('token'));
            await createPet(type, name, status, petPictureURL, (height*1), (weight*1), color, bio, hypo, dietary, breed, localStorage.getItem('token'))
            window.location.reload();
            }
        } catch (error) {
            if(error.response.data.message){
                alert(error.response.data.message)
            } else  {
                alert(error + " " + ":" + " " + error.response.data.errors[0].message)
            }
            
        }
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
        <div className="pagesBackgroundColorTwo" >
            <div className="pageHeaders admHeaderDisplay" >
                <Button onClick={logOut}>Log out</Button>
                <h1>Admin Page:</h1>
                <h4>* = Required</h4>
            </div>
            <div >
                <h3>Add Pet Form</h3>
                <form className="admPageDisplay editPetPage" onSubmit={handleFormSubmit}>
                    <div>
                    Type *:
                    <input type="radio" id="dog" name="type" value="dog" onChange={e=> setType(e.target.value)}/>
                    <label for="dog">Dog</label>
                    <input type="radio" id="cat" name="type" value="cat" onChange={e=> setType(e.target.value)}/>
                    <label for="cat">Cat</label>
                    </div>
                    <div>
                    <label>
                        Name *:
                        <input type="text" name="name" id="name" onChange={e=> setName(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    Adoption Status *:
                    <input type="radio" id="Adopted" name="status" value="adopted" onChange={e=> setStatus(e.target.value)}/>
                    <label for="Adopted">Adopted</label>
                    <input type="radio" id="Fostered" name="status" value="fostered" onChange={e=> setStatus(e.target.value)}/>
                    <label for="Fostered">Fostered</label>
                    <input type="radio" id="Available" name="status" value="available" onChange={e=> setStatus(e.target.value)}/>
                    <label for="Available">Available</label>
                    </div>
                    <div>
                    <label className='pet-img-wrapper'>
                        Picture *:
                        <input type="file" name="image" id="image"  onChange={e=> setImage(e.target.files[0])}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Height *:
                        <input type="number" name="height" id="height" onChange={e=> setHeight(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Weight *:
                        <input type="number" name="weight" id="weight"  onChange={e=> setWeight(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Color *:
                        <input type="text" name="color" id="color" onChange={e=> setColor(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Bio:
                        <textarea maxLength="50" type="text-area" name="bio" id="bio" onChange={e=> setBio(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Hypoallergenic *:
                        <input type="checkbox" name="hypo" id="hypo" onChange={e=> setHypo(!hypo)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Dietary restrictions *:
                        <textarea maxLength="50" type="text" name="dietary" id="dietary" onChange={e=> setDietary(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Breed of animal *:
                        <input type="text" name="breed" id="breed" onChange={e=> setBreed(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <Button type="submit">Add new Pet</Button>
                    </div>
                </form>
            </div>
            <h3>All the user in the data base:</h3>
            <div>
                {props.users && <div> 
                    <ol className="admPetsANDUsersDisplay">
                    {props.users.map((user) => <UsersCards key={user.id} fname={user.firstName} lname={user.lastName} role={user.role} id={user.id}/>)}
                    </ol>
                </div>}
            </div>
            <h3>All the Pets in the data base:</h3>
            <div>
                {props.pets && <div>
                    <ol className="admPetsANDUsersDisplay">
                    {props.pets.map((pets) => <AdmPetCards key={pets.id} picture={pets.picture} name={pets.name} status={pets.adoption_status} id={pets.id} type={pets.type}/>)}
                    </ol>
                </div>}
            </div>
        </div>
        </>
    );
}

export default Admin;