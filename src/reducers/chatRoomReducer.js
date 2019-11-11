export default function ChatRoomReducer( state = { currentChatRoom: null }, action) {
    switch (action.type) {
        case "FINISH_CREATE_PROJECT":
            const { novice_projects } = action.user
            return {
                currentChatRoom: novice_projects[novice_projects.length - 1].chat_room,
            }
            case "FINISH_FETCH_PROJECT":
                    return {
                        currentChatRoom: action.data.chat_room,
                    }
            case "FINISH_UPDATE_PROJECT":
                return {
                    currentChatRoom: action.data.chat_room,
                }
            case "LOGOUT":
                    return {
                        currentChatRoom: null
                    }
            case "CLEAR_CURRENT_PROJECT":
                    return {
                        currentChatRoom: null
                    }
            case 'RECEIVE_CHAT_MESSAGE':
                console.log('reducer receive chat message', action)
                let chatState = Object.assign( {}, state)
                let allMessages = chatState.currentChatRoom.messages
                allMessages.push(action.message)
                chatState.currentChatRoom.messages = allMessages
                return {
                    ...chatState
                }
        default:
            return state;
    }
}