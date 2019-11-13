import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBListGroup, MDBContainer } from "mdbreact"

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            message: {
                text: ''
            }
        };
    }
    
    updateScroll = (element) => {
        console.log('updateScroll')
        var element = document.getElementById('incoming-messages')
        if(element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    componentDidMount() {
        this.updateScroll()
    }

    componentDidUpdate(prevProps) {
        console.log('if', prevProps.chatRoom.messageCount, this.props.chatRoom.messageCount)
        console.log('if', prevProps.chatRoom.currentChatRoom.messages.length !== this.props.chatRoom.currentChatRoom.messages.length)
        console.log('chatContainer update', prevProps, this.props)
        if(prevProps.chatRoom.messageCount !== this.props.chatRoom.messageCount) {
            this.updateScroll()
        }
    }

    sendChatMessage = (event) => {
        const chatRoomId = this.props.project.chat_room.id
        event.preventDefault()
        fetch(`${process.env.REACT_APP_API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                ...this.state.message,
                user_id: this.props.user.id,
                chat_room_id: chatRoomId
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log('send chat message data', data)
            this.props.socket.emit("sendMessage", data, chatRoomId);
            this.setState({
                message: {
                    text: '',
                } 
            })
            this.updateScroll()
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

    renderChatMessages = (messages) => {
        console.log('messages container messages', messages)
        return messages.map( (message, key) => {
            return <li key={key} className={message.user_id === this.props.user.id ? 'chat-message w-50 shadow text-right blue lighten-2 rounded-pill ml-auto' : 'chat-message w-50 shadow mr-auto text-left purple lighten-3 rounded-pill'}>{message.text}</li>
        });
    };


    render() { 
        return ( 
            <div id='chat'>
                {(!this.props.project.expert_id && this.props.project.expert_status !== 'accepted') && <div id='chat-overlay'><h5>Connect With an Expert to Enable Chat</h5></div>}
                <div id='messages-window' className='mt-1'>
                    <div id='incoming-messages' className='shadow p-3 mb-3 bg-white rounded overflow-auto'>
                        <MDBContainer className='pt-1 pl-1 pr-1'>
                            <MDBListGroup className='w-100'>
                                {this.renderChatMessages(this.props.chatRoom.currentChatRoom.messages)}
                            </MDBListGroup>
                        </MDBContainer>
                    </div>
                    <form className='mt-1' onSubmit={(e) => {this.sendChatMessage(e)}}>
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
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        user: state.UserReducer.currentUser,
        project: state.ProjectReducer.currentProject,
        socket: state.SocketReducer.socket,
        chatRoom: state.ChatRoomReducer
    }
}
 
export default connect(mapStateToProps)(ChatContainer)