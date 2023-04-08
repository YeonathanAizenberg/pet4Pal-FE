import { NavLink } from 'react-router-dom';

function AdmPetCards(props) {

    return (
        <div>
            <li className="admCards">
                <div className="admCardsItems">
                    <div>{props.name}</div>
                    <div>{props.type}</div>
                    <img src={props.picture} height="100px" alt="Pet picture"/>
                    <div>{props.status}</div>
                    <NavLink exact to={`/Admin/AdmEditPet/${props.id}`}>Edit Pet</NavLink>
                </div>
            </li>
        </div>
    )
}

export default AdmPetCards;