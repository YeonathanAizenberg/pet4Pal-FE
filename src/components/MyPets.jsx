import PetCards from './PetCards';
import { Button } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import { getPetByOwner, getSavedPetsByUserId } from '../lib/api';

function MyPets() {

    const [ownedPets, setOwnedPets] = useState("");
    const [saved, setSaved] = useState(false);
    const [savedPets, setSavedPets] = useState("");
    const [displayPets, setDisplayPets] = useState(ownedPets);
    const toggle = () => {
        if(saved){
            setDisplayPets(ownedPets)
            setSaved(!saved)
        }
        else{
            setDisplayPets(savedPets)
            setSaved(!saved)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const matchingOwner = await getPetByOwner(localStorage.getItem("userID"), localStorage.getItem('token'));
            setOwnedPets(matchingOwner);
            const savedPetsFromTable = await getSavedPetsByUserId(localStorage.getItem("userID"), localStorage.getItem('token'));
            setSavedPets(savedPetsFromTable);
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        setDisplayPets(savedPets)
        setDisplayPets(ownedPets)
    }, [ownedPets, savedPets]);
    

    return (
    <>
    <div className="pagesBackgroundColor">
        <div className="pageHeaders myPetsHeaderDisplay" >
        <h3>MyPets</h3>
        <Button onClick={toggle}> Can toggle between pets and saved pets </Button>
        {!saved && <h5>Your Pets:</h5>}
        {saved && <h5>Saved Pets:</h5>}
        </div>
        <div>
        {ownedPets.pet === 0 && !saved && <h4>You currently do not own or foster any pets.</h4>}
            {savedPets.pet === 0 && saved && <h4>You currently do not saved any pets.</h4>}
            {displayPets && <ol  className="myPetsDisplay">
            {displayPets.pet.map((info) => <PetCards key={info.id} petName={info.name}  petImg={info.picture} petStatus={info.adoption_status} petId={info.id}/>)}
            </ol>}
        </div>
    </div>
    </>
    );
}

export default MyPets;