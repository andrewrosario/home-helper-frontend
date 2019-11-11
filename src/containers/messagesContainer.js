import React, { Component } from 'react';
import { MDBListGroup, MDBContainer } from "mdbreact"
import { connect } from 'react-redux'
import io from 'socket.io-client';
import { fetchProject } from '../actions/fetchProject'

var socket = io('https://diyhelper.herokuapp.com/');

class MessagesContainer extends Component {
    componentDidMount() {
        console.log('component did mount props', this.props.project)
        fetch(`${process.env.REACT_APP_API_URL}/chat_rooms/${this.props.project.id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then( () => {
            socket.on('connect', () => {})
            socket.on("receiveMessage", data => {
                console.log('socket on componenet did mount messages container', this.props.project)
                this.props.fetchProject(this.props.project)
            })
        })
        .catch(err => console.log(err))
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