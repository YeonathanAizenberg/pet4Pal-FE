import React from 'react';
import './NavBar.css';

function NavBar() {

    const changePage = (path) => {
        const baseUrl = window.location.origin
        window.location.replace(baseUrl+path)
    }

        return (
            <div className='nav-bar-wrapper'>
                    <button onClick={() =>changePage("/User")}>
                        Main Page
                    </button>

                    <button onClick={() => changePage("/MyPets")}>
                        My Pets
                    </button>

                    <button onClick={() =>changePage("/Profile")}>
                        Profile
                    </button>

                    <button onClick={() =>changePage("/Search")}>
                        Search Page
                    </button>
            </div>
        );
}

export default NavBar;