import React, { Component } from 'react';
import { MDBListGroup, MDBContainer } from "mdbreact"
import { connect } from 'react-redux'
import { fetchProject } from '../actions/fetchProject'

class MessagesContainer extends Component {
    componentDidUpdate(prevProps) {
        if(prevProps.project.chat_room.messages.length !== this.props.project.chat_room.messages.length) {
            this.forceUpdate()
        }
    }

    renderChatMessages = () => {
        return this.props.project.chat_room.messages.map( (message, key) => {
            return <li key={key} className={message.user_id === this.props.user.id ? 'chat-message w-50 shadow text-right blue lighten-2 rounded-pill ml-auto' : 'chat-message w-50 shadow mr-auto text-left purple lighten-3 rounded-pill'}>{message.text}</li>
        });
    };

    render() { 
        return (                         
        <div id='incoming-messages' className='shadow p-3 mb-3 bg-white rounded overflow-auto'>
            <MDBContainer className='pt-1 pl-1 pr-1'>
                <MDBListGroup className='w-100'>
                    {this.renderChatMessages()}
                </MDBListGroup>
            </MDBContainer>
        </div> );
    }
}

function mapStateToProps(state){
    return {
        user: state.UserReducer.currentUser,
        project: state.ProjectReducer.currentProject,
        socket: state.UserReducer.socket
    }
}
 
export default connect(mapStateToProps, { fetchProject })(MessagesContainer)