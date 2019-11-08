import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function TaskNewForm(props) {
    const [text, setText] = useState('')
    const [time, setTime] = useState('');
    
    return ( 
        <div className='row'>
            <Modal show={props.show} onHide={props.handleNewClick}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder='Task Description' value={text} className='new-task col-7' as='input' onChange={(e) => setText(e.target.value)}/>
                <Form.Control placeholder='Time (in minutes)' className='new-task col-2' as='input' value={time} onChange={(e) => setTime(e.target.value)} />
                <Button id='submit-task' onClick={() => props.handleDoneEditClick(text, time)}>Done</Button>
            </Modal.Body>
            </Modal>
        </div>
     );
}

export default TaskNewForm;

