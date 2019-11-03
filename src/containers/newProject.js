import React, { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'


function NewProject(props) {
    const [validated, setValidated] = useState(false);
    const form = useRef(null);

    const handleSubmit = (event, type) => {
        if (form.current.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        console.log('invalid')
        } else {
            type === 'submit' ? props.submitHandler(event) : props.continue(event)
        }
        setValidated(true);
    };

    return (
        <Modal.Body>
            <Form noValidate validated={validated} ref={form}>
                <Form.Group>
                    <Form.Control required type='text' name='name' placeholder='Project Name' onChange={props.handleChange('name')} />
                    <Form.Control required as='textarea' name='description' placeholder='Project Description' onChange={props.handleChange('description')} />
                    <Form.Control required as='select' name='type' defaultValue='' onChange={props.handleChange('type')}>
                        <option disabled value=''> -- select a project type -- </option>
                        <option value='1'>Paint</option>
                        <option value='2'>Plubming</option>
                        <option value='3'>Electrical</option>
                        <option value='4'>Carpentry</option>
                        <option value='5'>Flooring</option>
                        <option value='6'>Landscaping</option>
                    </Form.Control>
                    <Button onClick={(event) => handleSubmit(event, 'continue')}>
                        Add Before Pictures
                    </Button>
                    <Button className='float-right' onClick={(event) => handleSubmit(event, 'submit')}>
                        Continue without Photos
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Body>
    )
}

function mapStateToProps(state){
    return {user: state.UserReducer.currentUser.user}
}
 
export default connect(mapStateToProps ) (NewProject);