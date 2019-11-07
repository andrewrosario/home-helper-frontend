import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function TaskEditForm(props) {
    const [text, setText] = useState(props.task.text)
    const [time, setTime] = useState(props.task.time_required);
    const {id, is_complete} = props.task

    return ( 
        <div className='row'>
            <Modal show={props.show} onHide={() => props.handleClick(null, 'Edit')}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder='Task Description' value={text} className='new-task col-7' as='input' onChange={(e) => setText(e.target.value)}/>
                <Form.Control placeholder='Time' className='new-task col-2' as='input' value={time} onChange={(e) => setTime(e.target.value)} />
                <Button className='form-button' onClick={() => props.handleDoneEditClick(id, text, time, is_complete)}>Save</Button>
                <Button className='form-button float-right' onClick={props.handleDeleteClick}>Delete</Button>
            </Modal.Body>
            </Modal>
        </div>



     );
}

export default TaskEditForm;

