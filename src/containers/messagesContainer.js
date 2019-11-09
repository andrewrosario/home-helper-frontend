import React, { Component } from 'react';
import { MDBListGroup, MDBContainer } from "mdbreact"
import { connect } from 'react-redux'
import io from 'socket.io-client';
import { fetchProject } from '../actions/fetchProject'

// const endpoint = "http://127.0.0.1:8000"
// const socket = socketIOClient(endpoint);
var socket = io();

class MessagesContainer extends Component {
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/chat_rooms/${this.props.project.id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then( () => {
            socket.on('connect', () => {})
            socket.on("receiveMessage", data => {
                this.props.fetchProject(this.props.project)
            })
            socket.emit('room', `chat_id_${this.props.project.chat_room.id}`)
        })
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps) {
        if(prevProps.project.id !== this.props.project.id) {
            socket.emit('leave', `chat_id_${prevProps.project.chat_room.id}`)
            socket.emit('room', `chat_id_${this.props.project.chat_room.id}`)
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
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { fetchProject })(MessagesContainer)