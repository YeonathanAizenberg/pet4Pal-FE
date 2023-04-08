import { NavLink } from 'react-router-dom';

function UserProfile(props) {

    return (
        <div>
            <li className="admCards">
                <div className="admCardsItems">
                    <div>Role: {props.role}</div>
                    <div>Name: {props.fname} {props.lname}</div>
                    <NavLink exact to={`/Admin/UsersPage/${props.id}`}>User Page</NavLink>
                </div>
            </li>
        </div>
    )
}

export default UserProfile;