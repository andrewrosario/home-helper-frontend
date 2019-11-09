import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import NewUser from '../containers/newUser'
import Login from '../containers/login'

const  WelcomePage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false);

    const handleClose = () => {
        setShowSignUp(false)
        setShowLogin(false)
    }

    const handleShow = (event) => event.target.id === 'get-started' ? setShowSignUp(true) : setShowLogin(true)

    return ( 
        <>
            <div id={'welcome'} className='row' style={{backgroundImage: "url(/tools.jpg)", height: '100vh', backgroundSize: 'cover'}}>
                <div className='col-7'></div>
                <div id={'call-to-action'} className='col-5'>
                    <img id={'motto'} src={process.env.PUBLIC_URL + '/motto.png'} alt='The smart way to DIY'></img>
                    <Button id={'get-started'} onClick={handleShow} className={'rounded-pill'}>Get Started</Button>
                    <Button id={'login'} onClick={handleShow} className={'rounded-pill'}>Log In</Button>
                </div>
            </div>
            <Modal show={showSignUp} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewUser />
                </Modal.Body>
            </Modal>
            <Modal show={showLogin} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
            </Modal>
        </>
     );
}
 
export default WelcomePage;
