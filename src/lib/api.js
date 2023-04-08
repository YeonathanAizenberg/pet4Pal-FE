import axios from "axios";

// const BaseURL = "https://pet4pal.herokuapp.com"
const BaseURL = "http://localhost:5500"


const addAuthHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function getUser(email, password) { // Can have a token because the user need to login to get one
    const response = await axios.post(`${BaseURL}/users/login`, {email, password});
    localStorage.setItem('userID', response.data.user.id);
    localStorage.setItem('userFirstName', response.data.user.firstName);
    localStorage.setItem('userLastName', response.data.user.lastName);
    localStorage.setItem('userEmail', response.data.user.email);
    localStorage.setItem('userPhoneNumber', response.data.user.phoneNumber);
    localStorage.setItem('userRole', response.data.user.role);
    localStorage.setItem('token', response.data.token);
    if(response.data.user.role === "adm") {
        localStorage.setItem('isAdm', response.data.user.role);
        localStorage.setItem('token', response.data.token);
    }
    return response.data.user;
}

export async function getUserByIdForUser(id, token) {
    const response = await axios.get(`${BaseURL}/users/${id}`, addAuthHeader(token));
    return response.data.user;
}

export async function updateUserById(id, email, fname, lname, phone, bio, currentEmail, token) { 
    const response = await axios.put(`${BaseURL}/users/${id}`, {id, email, fname, lname, phone, bio, currentEmail}, addAuthHeader(token));
    return response.data.user;
}

export async function updateUserPasswordById(id, currentPass, newPass, token) { 
    const response = await axios.put(`${BaseURL}/users/${id}/updatePassword`, {id, currentPass, newPass}, addAuthHeader(token));
    return response.data.user;
}

export async function createUser(email, password, firstName, lastName, phoneNumber) { // Can have a token because the user will not have a token before he/she have an account
    const response = await axios.post(`${BaseURL}/users`, {email, password, firstName, lastName, phoneNumber});
    localStorage.setItem('userID', response.data.user.id);
    localStorage.setItem('userFirstName', response.data.user.firstName);
    localStorage.setItem('userLastName', response.data.user.lastName);
    localStorage.setItem('userEmail', response.data.user.email);
    localStorage.setItem('userPhoneNumber', response.data.user.phoneNumber);
    localStorage.setItem('userRole', response.data.user.role);
    localStorage.setItem('token', response.data.token);
    console.log(response.data.user)
    return response.data.user;
}

export async function getAllUsers(token) { 
    const response = await axios.get(`${BaseURL}/adm/user`, addAuthHeader(token));
    return response.data.user;
}

export async function getUserById(id, token) { 
    const response = await axios.get(`${BaseURL}/adm/user/${id}`, addAuthHeader(token));
    return response.data.user;
}

export async function createPet(type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal, token) {
    const infosObject = {type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal, token};
    const response = await axios.post(`${BaseURL}/adm/pet`, infosObject , addAuthHeader(token));
    return response.data.user;
}

export async function getAllPets(token) { 
    const response = await axios.get(`${BaseURL}/adm/pets`, addAuthHeader(token));
    return response.data.user;
}

export async function adoptPet(id, userId, petStatus,token) {
    console.log(id, userId, petStatus)
    const response = await axios.put(`${BaseURL}/users/pet/${id.id}`, {id, userId, petStatus}, addAuthHeader(token));
    return response.data.pet;
}

export async function getPetById(id) { // Can have a token because of the search page for non-log in users
    const response = await axios.get(`${BaseURL}/adm/pet/${id.id}`);
    return response.data.pet;
}

export async function updatePetPicture(image ,token) {
    const fd = new FormData();
    fd.append("image", image);
    const response = await axios.put(`${BaseURL}/adm/pet/img`, fd, addAuthHeader(token));
    return response.data.petPictureURL;
}

export async function updatePetById(id, type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal,token) {
    const infosObject = {id, type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal};
    const response = await axios.put(`${BaseURL}/adm/pet/${id.id}`, infosObject, addAuthHeader(token));
    return response.data.pet;
}

export async function getPetSearch() { // Can have a token because of the search page for non-log in users
    const response = await axios.get(`${BaseURL}/users/search`);
    return response.data;
}

export async function getPetAdvSearch() {  // Can have a token because of the search page for non-log in users
    const response = await axios.get(`${BaseURL}/users/adv_search`);
    return response.data;
}

export async function getPetByOwner(ownerId,token) { 
    const response = await axios.get(`${BaseURL}/users/pet/${ownerId}`, addAuthHeader(token));
    return response.data;
}

export async function addPetsByUserId(id, userId, token) { 
    const response = await axios.post(`${BaseURL}/users/pet/${id.id}/${userId}`, "[data]",addAuthHeader(token));
    return response.data;
}

export async function getPetsByUserId(id, userId, token) { // <=======
    const response = await axios.get(`${BaseURL}/users/pet/${id.id}/${userId}`, addAuthHeader(token));
    return response.data;
}

export async function removePetsByUserId(id, userId,token) {
    const response = await axios.delete(`${BaseURL}/users/pet/${id.id}/${userId}`, addAuthHeader(token));
    return response.data;
}

export async function getSavedPetsByUserId(userId,token) { 
    const response = await axios.get(`${BaseURL}/users/myPets/${userId}`, addAuthHeader(token));
    return response.data;
}