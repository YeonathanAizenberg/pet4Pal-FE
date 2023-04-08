import React, { useState, useEffect } from 'react';
import AdminPage from './AdminPage';
import UsersPage from './UsersPage';
import AdmEditPet from './AdmEditPet';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getAllUsers, getAllPets } from '../lib/api';

function PathsAdm() {

    const [users, setUsers] = useState("");
    const [pets, setPets] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const usersResult = await getAllUsers(localStorage.getItem('token'));
            const petsResult = await getAllPets(localStorage.getItem('token'));
            setUsers(usersResult);
            setPets(petsResult);
        };
        fetchData();
    }, []);

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/Admin"/>
                    </Route>
                    <Route exact path="/Admin">
                        <AdminPage users={users} pets={pets} />
                    </Route>
                    <Route path="/Admin/UsersPage/:id">
                        <UsersPage/>
                    </Route>
                    <Route path="/Admin/AdmEditPet/:id">
                        <AdmEditPet pets={pets}/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default PathsAdm;