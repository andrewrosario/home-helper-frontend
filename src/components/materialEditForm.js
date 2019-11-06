import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function MaterialEditForm(props) {
    const [name, setName] = useState(props.material.name)
    const [cost, setCost] = useState(props.material.cost)
    const [link, setLink] = useState(props.material.link)
    const [amount, setAmount] = useState(props.material.amount)
    const [unit, setUnit] = useState(props.material.amount_unit)
    
    return ( 
        <div className='row'>
            <Modal show={props.show} onHide={props.handleEditClick}>
            <Modal.Header closeButton>
                <Modal.Title>Update Material</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control 
                    placeholder='Material Description' 
                    value={name} 
                    className='new-task col-7' 
                    as='input' 
                    onChange={(e) => setName(e.target.value)}
                />
                <Form.Control 
                    placeholder='Amount' 
                    className='new-task col-7' 
                    as='input' 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
                <Form.Control 
                    placeholder='Units' 
                    className='new-task col-7' 
                    as='input' 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)} 
                />
                <Form.Control 
                    placeholder='Link to Material (optional)' 
                    className='new-task col-7' 
                    as='input' 
                    value={link} 
                    onChange={(e) => setLink(e.target.value)} 
                />
                <Form.Control 
                    placeholder='Cost' 
                    className='new-task col-7' 
                    as='input' 
                    value={cost} 
                    onChange={(e) => setCost(e.target.value)} 
                    />
                <Button className='form-button' onClick={() => props.handleDoneEditClick({name, amount, amount_unit: unit, link, cost})}>Save</Button>
                <Button className='form-button float-right' onClick={props.handleDeleteClick}>Delete</Button>
            </Modal.Body>
            </Modal>
        </div>



     );
}

export default MaterialEditForm;