import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { createNewUser } from '../actions/createNewUser'

class NewUser extends Component {
    state = { 
        user: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            image: null
        },
        validated: false
    }

    validateForm = (event) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            this.props.createNewUser(this.state.user)
        }
        this.setState({
            ...this.state,
            validated: true
        })
    }

    handleFormChange = event => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    handleAddFiles = event => {
        this.setState({ 
            ...this.state,
            user: {
                ...this.state.user,
                image: event.target.files[0]
            }
        })
    }

    render() { 
        return ( 
            <div>
                <Form noValidate validated={this.state.validated} onSubmit={(event) => this.validateForm(event)}>
                    {['name', 'email', 'password', 'password_confirmation'].map( (name, index) => <Form.Control required key={index} type={name} name={name} placeholder={name} value={this.state.user[name]} onChange={this.handleFormChange}/>)}
                    <Form.Control type="file" name="image" onChange={this.handleAddFiles} />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
         );
    }
}

 
export default connect(null, { createNewUser })(NewUser);