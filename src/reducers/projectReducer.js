export default function ProjectReducer( state = { completeCount: 0, taskCount: 0, currentProject: null , requesting: false }, action) {
    switch (action.type) {
        case 'START_CREATE_PROJECT_REQUEST':
            return {
                ...state,
                currentProject: null,
                requesting: true
            }
        case "FINISH_CREATE_PROJECT":
            const { novice_projects } = action.user
            return {
                ...state,
                currentProject: novice_projects[novice_projects.length - 1],
                requesting: false
            }
        case "START_FETCH_PROJECT":
            return {
                ...state,
                requesting: true
            }
        case "FINISH_FETCH_PROJECT":
                return {
                    ...state,
                    currentProject: action.data,
                    requesting: false
                }
        case "START_UPDATE_PROJECT":
            return {
                ...state,
                requesting: true
            }
        case "FINISH_UPDATE_PROJECT":
            return {
                ...state,
                currentProject: action.data,
                requesting: false
            }
        case "LOGOUT":
            return {
                currentProject: null,
                requesting: false
            }
        case "CLEAR_CURRENT_PROJECT":
            return {
                ...state,
                currentProject: null
            }
        case "START_NEW_COMMENT":
            return {
                ...state,
                requesting: true
            }
        case 'FINISH_NEW_COMMENT':
            const pluralType = action.commentType + 's'
            let object = Object.assign( {}, state)
            object.currentProject[pluralType] = action.comment
            object.requesting = false
            return {
                ...object
            }
        case 'START_UPDATE_TASK':
            return {
                ...state,
                requesting: true
            }
        case 'FINISH_UPDATE_TASK':
            const completeCount = action.tasks.filter(t => t.is_complete).length
            let taskState = Object.assign( {}, state)
            taskState.currentProject.tasks = action.tasks
            taskState.taskCount = taskState.currentProject.tasks.length         
            taskState.requesting = false
            taskState.completeCount = completeCount  
            return {
                ...taskState
            }
        case 'UPDATE_MATERIALS':
            let materialsState = Object.assign( {}, state)
            materialsState.currentProject.materials = action.materials
            return {
                ...materialsState
            }
        case 'RECEIVE_CHAT_MESSAGE':
            let chatState = Object.assign( {}, state)
            let allMessages = chatState.currentProject.chat_room.messages
            allMessages.push(action.message)
            chatState.currentProject.chat_room.messages = allMessages
            return {
                ...chatState
            }
        default:
            return state;
    }
}