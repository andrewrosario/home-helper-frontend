export default function loginReducer( state = { currentUser: null , requesting: false, showNewProject: false }, action) {
    switch (action.type) {
        case 'START_LOGIN_REQUEST':
            return {
                ...state,
                currentUser: state.currentUser,
                requesting: true
            }
        case 'LOGIN':
            const currentUser = action.user
            return {
                ...state,
                currentUser,
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
                showNewProject: false
            }
        case "FINISH_CREATE_PROJECT":
            return {
                ...state,
                currentUser: action.user,
                requesting: false
            }
        default:
            return state;
    }
}