import React, { useState, useRef } from 'react'
import { Form, Button, Modal} from 'react-bootstrap'
import { connect } from 'react-redux'

function NewProject(props) {
    const [validated, setValidated] = useState(false)
    const form = useRef(null)
    const projectTypes = ['Paint', 'Plumbing', 'Electrical', 'Carpentry', 'Flooring', 'Landscaping']

    const handleSubmit = (event, type) => {
        if (form.current.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            type === 'submit' ? props.submitHandler(event) : props.continue(event, 1)
        }
        setValidated(true)
    };

    return (
        <Modal.Body>
            <Form noValidate validated={validated} ref={form}>
                <Form.Group>
                    <Form.Control required type='text' name='name' placeholder='Project Name' onChange={props.handleChange('name')} />
                    <Form.Control required as='textarea' name='description' placeholder='Project Description' onChange={props.handleChange('description')} />
                    <Form.Control required as='select' name='type' defaultValue='' onChange={props.handleChange('type')}>
                        <option disabled value=''> -- select a project type -- </option>
                        {projectTypes.map ( (type, index) => <option key={index} value={index + 1}>{type}</option>)}
                    </Form.Control>
                    <Button onClick={(event) => handleSubmit(event, 'continue')}>
                        Add Before Pictures
                    </Button>
                    <Button className='float-right' onClick={(event) => handleSubmit(event, 'submit')}>
                        Continue Without Photos
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