export default function ProjectReducer( state = { currentUser: null , requesting: false }, action) {
    switch (action.type) {
        case 'START_CREATE_PROJECT_REQUEST':
            return {
                ...state,
                currentUser: state.currentUser,
                requesting: true
            }
        case "FINISH_CREATE_PROJECT":
            return {
                ...state,
                currentUser: action.user,
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
                    requesting: false
                }
        default:
            return state;
    }
}