import React, { Component } from 'react';
import NavBar from './navbar'
import {Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux'


class NoviceDashboard extends Component {
    constructor(props) {
        super(props)
        const showModal = props.user.projects ? false : true
        this.state = {
            currentProject: props.user.projects,
            showCreateProject: showModal
        }
    }

    state = { 
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            showCreateProject: false
        })
    }

    render() { 
        return ( 
            <div>
                <NavBar />
                <div id='dashboard-container' className='container'>
                    <div id='tasks-details' className='row'>
                        <div id='tasks' className='col-8'>
                        <h1>Tasks</h1>
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                        </div>
                        <div id='details' className='col-4'>
                        <h1>Details</h1>
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </div>
                    </div>
                    <div id='materials-chat' className='row'>
                        <div id='materials' className='col-8'>
                            <h1>Materials</h1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum lacinia quis vel eros. A erat nam at lectus urna duis convallis convallis tellus. Neque vitae tempus quam pellentesque nec nam aliquam sem. Mattis nunc sed blandit libero volutpat sed cras ornare. Laoreet id donec ultrices tincidunt arcu non sodales neque. Sit amet aliquam id diam maecenas ultricies mi. Semper risus in hendrerit gravida rutrum quisque non. Vel fringilla est ullamcorper eget nulla. Id ornare arcu odio ut. Sagittis id consectetur purus ut. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Nunc sed velit dignissim sodales ut eu. Diam volutpat commodo sed egestas egestas fringilla phasellus. Fringilla urna porttitor rhoncus dolor purus non. Amet commodo nulla facilisi nullam vehicula ipsum a arcu. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Ipsum suspendisse ultrices gravida dictum.
                        </div>
                        <div id='chat' className='col-4'>
                            <h1>Chat</h1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum lacinia quis vel eros. A erat nam at lectus urna duis convallis convallis tellus. Neque vitae tempus quam pellentesque nec nam aliquam sem. Mattis nunc sed blandit libero volutpat sed cras ornare. Laoreet id donec ultrices tincidunt arcu non sodales neque. Sit amet aliquam id diam maecenas ultricies mi. Semper risus in hendrerit 
                        </div>
                    </div>

                </div>
                <Modal show={this.state.showCreateProject} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create a New Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                </Modal>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {user: state.LoginReducer.currentUser.user}
  }
  
 
export default connect(mapStateToProps)(NoviceDashboard);