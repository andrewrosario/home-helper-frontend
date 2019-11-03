import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

const AddBeforePhotos = (props) => {
    return ( 
        <Modal.Body>
            <Form>
                <Form.Label>Add Before Photos</Form.Label>
                <Form.Control type="file" name="image" onChange={props.handleAddFiles} multiple/>
                <Button onClick={props.submitHandler}>
                    Done
                </Button>
            </Form>
        </Modal.Body>
     );
}

function mapStateToProps(state) {
    return { project: state.UserReducer.currentUser.user.novice_projects }
}

export default connect(mapStateToProps)(AddBeforePhotos);