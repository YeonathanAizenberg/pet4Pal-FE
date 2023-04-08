import React, { useState, useEffect } from 'react';
import Search from "./Search";
import Homepage from "./Homepage";
import PetPage from "./PetPage";
import { getPetSearch, getPetAdvSearch } from '../lib/api';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function PathsLogOut(props) {

    const [search, setSearch] = useState("");
    const [advSearch, setAdvSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const search = await getPetSearch();
            const advSearch = await getPetAdvSearch();
            setSearch(search);
            setAdvSearch(advSearch);
        };
        fetchData();
    }, []);
    

    return (
        <>
        <Router>
            <Switch>
            <Route exact path="/">
                <Homepage/>
            </Route>
            <Route exact path="/User">
                <Redirect to="/"/>
            </Route>
            <Route exact path="/Admin">
                <Redirect to="/"/>
            </Route>
            <Route exact path="/Search">
                {search && advSearch && <Search search={search} advSearch={advSearch} userautho={props.userautho} savedPets={props.savedPets} />}
            </Route>
            <Route path="/Search/PetPage/:id">
                <PetPage userautho={props.userautho}/>
            </Route>
            </Switch>
        </Router>
        </>
    );
}

export default PathsLogOut;