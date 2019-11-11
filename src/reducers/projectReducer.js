export default function ProjectReducer( state = { currentProject: null , requesting: false }, action) {
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
            const index = state.currentProject[pluralType].findIndex(element => element.id === action.comment[`${action.commentType}_id`])
            let object = Object.assign( {}, state)
            let commentArray = object.currentProject[pluralType][index].comments
            commentArray.push(action.comment)
            object.currentProject[pluralType][index].comments = commentArray
            return {
                ...object
            }
        case 'START_UPDATE_TASK':
            return {
                ...state,
                requesting: true
            }
        case 'FINISH_UPDATE_TASK':
            let taskState = Object.assign( {}, state)
            taskState.currentProject.tasks = action.data
            return {
                ...taskState
            }
        case 'UPDATE_MATERIALS':
            console.log('materials in reducer', action.materials) 
            let materialsState = Object.assign( {}, state)
            materialsState.currentProject.materials = action.materials
            return {
                ...materialsState
            }
        case 'RECEIVE_CHAT_MESSAGE':
            console.log('reducer receive chat message', action)
            let chatState = Object.assign( {}, state)
            chatState.currentProject.chat_room.messages.push(action.message)
            return {
                ...chatState
            }
        default:
            return state;
    }
}