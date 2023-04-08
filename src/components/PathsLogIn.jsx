import React, { useState, useEffect } from 'react';
import Search from "./Search";
import HomepageUsers from "./HomepageUsers";
import MyPets from "./MyPets";
import Profile from "./Profile";
import PetPage from "./PetPage";
import { BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';
import { getPetSearch, getPetAdvSearch } from '../lib/api';
import NavBar from './navBar/NavBar';

function PathsLogOut(props) {

    const [search, setSearch] = useState("");
    const [advSearch, setAdvSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const search = await getPetSearch(localStorage.getItem('token'));
            const advSearch = await getPetAdvSearch(localStorage.getItem('token'));
            setSearch(search);
            setAdvSearch(advSearch);
        };
        fetchData();
    }, []);
    
    return (
        <>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/User"/>
                    </Route>
                    <Route exact path="/User">
                        <HomepageUsers/>
                    </Route>
                    <Route path="/Search">
                    {search && advSearch && <Search search={search} advSearch={advSearch} userautho={props.userautho}/>}
                    </Route>
                    <Route path="/Profile">
                        <Profile />
                    </Route>
                    <Route exact path="/MyPets">
                        <MyPets/>
                    </Route>
                    <Route path="/MyPets/PetPage/:id">
                        <PetPage userautho={props.userautho} />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default PathsLogOut;
