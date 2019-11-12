export default function ChatRoomReducer( state = { currentChatRoom: null, messageCount: 0 }, action) {
    switch (action.type) {
        case "FINISH_CREATE_PROJECT":
            const { novice_projects } = action.user
            return {
                currentChatRoom: novice_projects[novice_projects.length - 1].chat_room,
            }
        case "FINISH_FETCH_PROJECT":
                return {
                    currentChatRoom: action.data.chat_room,
                    messageCount: action.data.chat_room.messages.length
                }
        case "FINISH_UPDATE_PROJECT":
            return {
                currentChatRoom: action.data.chat_room,
                messageCount: action.data.chat_room.messages.length
            }
        case "LOGOUT":
                return {
                    currentChatRoom: null,
                    messageCount: 0
                }
        case "CLEAR_CURRENT_PROJECT":
                return {
                    currentChatRoom: null,
                    messageCount: 0
                }
        case 'RECEIVE_CHAT_MESSAGE':
            console.log('reducer receive chat message', action)
            let chatState = Object.assign( {}, state)
            chatState.messageCount = chatState.currentChatRoom.messages.length
            console.log("chatState", chatState)
            return {
                ...chatState
            }
        default:
            return state;
    }
}