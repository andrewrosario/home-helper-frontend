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
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.createNewUser(this.state)
    }

    handleFormChange = event => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    render() { 
        return ( 
            <div>
                <Form onSubmit={(e) => this.submitHandler(e)}>
                    {['name', 'email', 'password', 'password_confirmation'].map( (name, index) => <Form.Control key={index} type={name} name={name} placeholder={name} value={this.state[name]} onChange={this.handleFormChange}/>)}
                    <Form.Control type="file" name="image" onChange={this.handleFileChange} />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
         );
    }
}

 
export default connect(null, { createNewUser })(NewUser);