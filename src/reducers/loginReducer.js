export default function loginReducer( state = { currentUser: null , requesting: false }, action) {

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
        default:
            return state;
    }
}