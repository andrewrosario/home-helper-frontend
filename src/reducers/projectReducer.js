export default function ProjectReducer( state = { taskCount: 0, currentProject: null , requesting: false }, action) {
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
            console.log('finish new comment action', action)
            const pluralType = action.commentType + 's'
            // const index = state.currentProject[pluralType].findIndex(element => element.id === action.comment[`${action.commentType}_id`])
            let object = Object.assign( {}, state)
            object.currentProject[pluralType] = action.comment
            // let commentArray = object.currentProject[pluralType][index].comments
            // commentArray.push(action.comment)
            // object.currentProject[pluralType][index].comments = commentArray
            object.requesting = false
            console.log('finish new comment object', object)
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
            console.log('finish update task, completeCount', completeCount)
            console.log('finish update task, taskState', taskState)
            console.log('finish update task, action', action)           
            taskState.requesting = false
            taskState.currentProject.complete_tasks = completeCount
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