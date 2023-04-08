import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import Login from './LogIn';
import SingUp from './SingUp';

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
        }
    }

    showModal = () => {
        this.setState({show:true})
    }

    handleModal = () => {
        this.setState({show:false})
    }

    render(){
        return (
            <>
                <div className="pagesBackgroundColorTwo">
                    <div className="wellComeContainer">
                        <h1 className="wellComeHeader">Welcome to Pet4Pal</h1>
                        <div className="wellComeTextContainer">
                            <h3 className="wellComeText">Our goal is to give you your new best friend, a pal to hang out! Save a Pet, put a smile on your face, and build together memories for a lifetime!</h3>
                        </div>
                        <div className='welcome-page-buttons-wrapper'>
                            <Button className="btnBorder" onClick={this.showModal}>
                                <div className="test">Login/Sign up btn</div>
                            </Button>
                            <NavLink exact to="/Search">
                                <Button  className="btnBorder">
                                    Search page
                                </Button> 
                        </NavLink>
                        </div>
                        <Modal show={this.state.show} onHide={this.handleModal}>
                            <Modal.Header className="modalHeader">
                                Login/Sign up 
                                <Button onClick={this.handleModal}>
                                    Close Modal
                                </Button>
                            </Modal.Header>
                            <Modal.Body className="modalBody">
                                <Login/>
                                <SingUp/>
                            </Modal.Body>
                            <Modal.Footer className="modalHeader">
                                <Button onClick={this.handleModal}>
                                    Close Modal
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    <img className="mainDog" src="images/mainDog.jpg"/>
                    </div>
                </div>
            </>
        );
    }
}

export default Homepage;