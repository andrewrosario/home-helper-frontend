import React, { Component } from 'react';

const SignUpForm = (props) => {
    return (
        <Form onSubmit={(e) => this.props.submitHandler(e)}>
            {['name', 'email', 'password', 'password_confirmation'].map( (name, index) => <Form.Control key={index} type={name} name={name} placeholder={name} value={this.state[name]} onChange={this.handleFormChange}/>)}
            <Form.Control type="file" name="image" onChange={this.handleFileChange} />
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      );
}
 
export default SignUpForm;