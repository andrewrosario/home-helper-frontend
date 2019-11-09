import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { login } from '../actions/login'

class NewUser extends Component {
    state = { 
        email: '',
        password: ''
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.login(this.state)
    }

    handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() { 
        return ( 
            <div>
                <Form onSubmit={(e) => this.submitHandler(e)}>
                    {['email', 'password'].map( (name, index) => <Form.Control key={index} type={name} name={name} placeholder={name} value={this.state[name]} onChange={this.handleFormChange}/>)}
                    <Button className='sign-up' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
         );
    }
}

export default connect(null, { login })(NewUser);