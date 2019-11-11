export default function UserReducer( state = { currentUser: null , expertMode: false, requesting: false, showNewProject: false }, action) {
    const currentUser = action.user
    switch (action.type) {
        case 'START_CREATE_USER_REQUEST':
            return {
                ...state,
                currentUser: state.currentUser,
                requesting: true
            }
        case 'CREATE_NEW_USER': 
            return {
                ...state,
                currentUser: currentUser,
                requesting: false
            }
        case 'START_LOGIN_REQUEST':
            return {
                ...state,
                currentUser: state.currentUser,
                requesting: true
            }
        case 'LOGIN':
            return {
                ...state,
                currentUser: action.info.user,
                socket: action.info.socket,
                requesting: false
            }
        case 'START_UPDATE_REQUEST':
            return {
                ...state,
                currentUser: state.currentUser,
                requesting: true
            }
        case 'LOGOUT':
            localStorage.removeItem("jwt");
            localStorage.removeItem("userId");
            return {
                ...state,
                currentUser: null,
                currentProject: null,
                showNewProject: false
            }
        case "FINISH_CREATE_PROJECT":
            const { novice_projects } = action.user
            
            return {
                ...state,
                currentUser: action.user,
                requesting: false
            }
        default:
            return state;
    }
}