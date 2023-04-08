import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    logOut() {
        localStorage.clear();
        window.location.reload()
    }

    render() {
        return (
            <>
            <div className="pagesBackgroundColor">
                <div className="pageHeaders">
                    <h1>Welcome Pal, <u>{localStorage.getItem('userFirstName')} {localStorage.getItem('userLastName')}!</u></h1>
                </div>
                <div className="userDisplay">
                    <div><NavLink exact to="/MyPets"> MyPets </NavLink></div>
                    <div><NavLink exact to="/Profile"> Profile </NavLink></div>
                    <div><NavLink exact to="/Search"> Search page </NavLink></div>
                    <Button onClick={() => { this.logOut() }}>Log out</Button>
                </div>
            </div>
            </>
        );
    }
}

export default Homepage;