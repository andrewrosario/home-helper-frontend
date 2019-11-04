import React, { Component } from 'react';
import { Form, Button, Modal} from 'react-bootstrap'

class SelectExpert extends Component {
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/experts/${this.props.projectTypeId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    state = {  }
    render() { 
        return ( 
            <Modal.Body>
                <Form>
                    <h2>Pick an Expert</h2>
                </Form>
            </Modal.Body>
         );
    }
}
 
export default SelectExpert;