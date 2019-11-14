import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const CommentNewForm = (props) => {
    const [text, setText] = useState('')

    return ( 
        <>
            <Form.Control placeholder='Comment Text' value={text} as='input' onChange={(e) => setText(e.target.value)}/>
            <Button className='form-button' onClick={() => props.handleDoneCommentClick(text)}>Done</Button>
        </>
     );
}
 
export default CommentNewForm;