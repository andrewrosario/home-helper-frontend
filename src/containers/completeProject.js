import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'

import ExpertCard from '../components/expertCard'

import { submitAfterPhotos } from '../actions/submitAfterPhotos'

class CompleteProject extends Component {
    state = { 
        stage: 1,
        after_photos: []
    }

    nextStage = () => {
        console.log('next')
        this.setState({
            ...this.state,
            stage: this.state.stage + 1
        })
    }

    handleAddFiles = event => {
        this.setState({ 
            ...this.state,
            after_photos: event.target.files 
        })
    }

    submitHandler = () => {
        this.props.submitAfterPhotos(this.state.after_photos, this.props.project.id)
        this.nextStage()
    }

    getRating = (value) => {
        fetch(`${process.env.REACT_APP_API_URL}/ratings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                novice_id: this.props.user.id,
                expert_id: this.props.project.expert.id,
                rating: value
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.nextStage()
        })
    }

    displayStage = (stage) => {
        switch (stage) {
            case 1:
                return (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Congratulations! You have finished all your tasks. Is your project complete?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Button onClick={this.nextStage}>Yes!</Button>
                            <Button className='float-right' onClick={this.props.toggleComplete}>Not Yet</Button>
                        </Modal.Body>
                    </>
                )
            case 2:
                return (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Submit After Photos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            If you choose to submit after photos they will be reviewed an you may rise to expert level for this type of project.
                        </Modal.Body>
                        <Modal.Footer>
                            <Form>
                                <Form.Label>Add After Photos</Form.Label>
                                <Form.Control type="file" name="image" onChange={this.handleAddFiles} multiple/>
                                <Button className='float-left' onClick={this.submitHandler}>Submit Photos</Button>
                                <Button className='float-right' onClick={this.submitHandler}>Continue without Photos</Button>
                            </Form>
                        </Modal.Footer> 
                    </>
                )
            case 3:
                return (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Rate your Expert</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {`How was working with ${this.props.project.expert.name}?`}
                        </Modal.Body>
                        <Modal.Footer>
                            <ExpertCard expert={this.props.project.expert} done={true} getRating={this.getRating} />
                        </Modal.Footer> 
                    </>
                )
            default:
                return (                    
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Project Complete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            We hope our process and experts helped.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='float-right' onClick={this.props.handleHomeClick}>Return Home</Button>
                        </Modal.Footer> 
                    </>
                )
        }
    }

    render() { 
        return ( 
            <Modal show={this.props.show} onHide={this.props.toggleComplete}>
                {this.displayStage(this.state.stage)}
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.UserReducer.currentUser,
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { submitAfterPhotos })(CompleteProject)