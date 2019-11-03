import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

class NewProject extends Component {
    state = {
    }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() { 
            return (
                <Modal.Body>
                    <Form>
                        <Form.Control type='text' name='name' placeholder='Project Name' onChange={this.props.handleChange('name')} />
                        <Form.Control as='textarea' name='description' placeholder='Project Description' onChange={this.props.handleChange('description')} />
                        <Form.Control as='select' name='type' onChange={this.props.handleChange('type')}>
                            <option>Project Type</option>
                            <option value='1'>Paint</option>
                            <option value='2'>Plubming</option>
                            <option value='3'>Electrical</option>
                            <option value='4'>Carpentry</option>
                            <option value='5'>Flooring</option>
                            <option value='6'>Landscaping</option>
                        </Form.Control>
                        <Button onClick={this.continue}>
                            Add Before Pictures
                        </Button>
                        <Button onClick={this.props.submitHandler}>
                            Continue without Photos
                        </Button>
                    </Form>
                </Modal.Body>
            )
        }
    }


function mapStateToProps(state){
    return {user: state.UserReducer.currentUser.user}
}
 
export default connect(mapStateToProps ) (NewProject);