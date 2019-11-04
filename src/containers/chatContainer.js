import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import MessagesContainer from './messagesContainer'
import { connect } from 'react-redux'

const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint);

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:8000",
            message: {
                text: '',
                chat_id: 0
            }
        };
    }

    sendChatMessage = (socket, event) => {
        event.preventDefault()
        fetch(`${process.env.REACT_APP_API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                ...this.state.message,
                user_id: this.props.user.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            socket.emit("sendMessage", data);
            this.setState({
                currentMessage: {
                    ...this.state.message,
                    text: ''
                } 
            })
        });
    };

    handleMessageInputChange = (event) => {
        this.setState({
            message: {
                ...this.state.message,
                text: event.target.value
            } 
        });
    };

    render() { 
        return ( 
            <div id='chat'>
                <Col id='chat-window'>
                    <div id='messages-window' className='h-100'>
                        <MessagesContainer />
                        <form className='mt-1' onSubmit={(e) => {this.sendChatMessage(socket, e)}}>
                            <input 
                                className='w-75' 
                                type='text' 
                                onChange={(event) => this.handleMessageInputChange(event)} 
                                value={this.state.message.text}>
                            </input>
                            <input type='submit'></input>
                        </form>
                    </div>
                    <br></br>
                </Col>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        user: state.UserReducer.currentUser.user,
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps)(ChatContainer)