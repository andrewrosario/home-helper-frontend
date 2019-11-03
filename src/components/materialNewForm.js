import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function MaterialNewForm(props) {
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [link, setLink] = useState('')
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    
    return ( 
        <div className='row'>
            <Modal show={props.show} onHide={props.handleNewClick}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder='Material Description' value={name} className='new-task col-7' as='input' onChange={(e) => setName(e.target.value)}/>
                <Form.Control placeholder='Amount' className='new-task col-7' as='input' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Form.Control placeholder='Units' className='new-task col-7' as='input' value={unit} onChange={(e) => setUnit(e.target.value)} />
                <Form.Control placeholder='Link to Material (optional)' className='new-task col-7' as='input' value={link} onChange={(e) => setLink(e.target.value)} />
                <Form.Control placeholder='Cost' className='new-task col-7' as='input' value={cost} onChange={(e) => setCost(e.target.value)} />
                <Button className='form-button' onClick={() => props.handleDoneNewClick(name, amount, unit, link, cost)}>Done</Button>
            </Modal.Body>
            </Modal>
        </div>
     );
}

export default MaterialNewForm;