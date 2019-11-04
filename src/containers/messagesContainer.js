import React, { Component } from 'react';
import { MDBListGroup, MDBContainer } from "mdbreact";
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client";

const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint);

class MessagesContainer extends Component {
    state = { 
        messages: []
     }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/chats/${this.props.currentProject.id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then( () => {
            socket.on('connect', () => {
            })
            socket.on("receiveMessage", data => {
                this.setState({
                    messages: [...this.state.messages, data]
                })
            })
        });
    }  

    renderChatMessages = () => {
        if(!this.props.currentProject.chat) {
            return <h3 className='text-muted font-italic mt-5'>Select an Existing Chat or Start a New Chat</h3>
        } else {
            // return this.props.currentDisplayedChat.map( (message, key) => {
            //     return <li key={key} className={message.user_id === currentUser ? 'chat-message w-50 shadow text-right blue lighten-2 rounded-pill ml-auto' : 'chat-message w-50 shadow mr-auto text-left purple lighten-3 rounded-pill'}>{message.text}</li>
            // });
        }
    };

    render() { 
        return (                         
        <div id='incoming-messages' className='h-75 shadow p-3 mb-3 bg-white rounded'>
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
        user: state.UserReducer.currentUser.user,
        currentProject: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps)(MessagesContainer)