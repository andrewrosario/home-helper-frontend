import React, { Component } from 'react';

class NewProject extends Component {
    state = {  }
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
 
export default NewProject;