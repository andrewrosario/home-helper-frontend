import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const CommentNewForm = (props) => {
    const [text, setText] = useState('')

    return ( 
        <div className='row'>
            <Modal show={props.show} onHide={() => props.handleClick(null, 'Comment')}>
            <Modal.Header closeButton>
                <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control placeholder='Comment Text' value={text} as='input' onChange={(e) => setText(e.target.value)}/>
                <Button className='form-button' onClick={() => props.handleDoneCommentClick(text)}>Done</Button>
            </Modal.Body>
            </Modal>
        </div>
     );
}
 
export default CommentNewForm;