import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { createNewProject} from '../actions/createNewProject'

class NewProject extends Component {
    state = {  
        project: {
            user: this.props.user.id,
            name: '',
            description: '',
            type: ''
        } 
    }

    handleFormChange = event => {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                [event.target.name]: event.target.value
            }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.createNewProject(this.state.project)
        this.props.toggleCreateProject()
    }

    render() { 
            return (
                <div>
                    <Form onSubmit={(e) => this.submitHandler(e)}>
                        <Form.Control type='text' name='name' placeholder='Project Name' onChange={this.handleFormChange} />
                        <Form.Control as='textarea' name='description' placeholder='Project Description' onChange={this.handleFormChange} />
                        <Form.Control as='select' name='type' onChange={this.handleFormChange}>
                            <option value='1'>Project Type</option>
                            <option value='2'>Paint</option>
                            <option value='3'>Plubming</option>
                            <option value='4'>Electrical</option>
                            <option value='5'>Carpentry</option>
                            <option value='6'>Flooring</option>
                            <option value='7'>Landscaping</option>
                        </Form.Control>
                        <Button type="submit">
                            Begin Planning
                        </Button>
                    </Form>
                </div>
            )
        }
    }


function mapStateToProps(state){
    return {user: state.UserReducer.currentUser.user}
}
 
export default connect(mapStateToProps, { createNewProject } ) (NewProject);