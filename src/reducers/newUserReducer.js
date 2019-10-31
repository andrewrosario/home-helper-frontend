export default function newUserReducer( state = { currentUser: null , requesting: false }, action) {

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
                currentUser: action.user,
                requesting: false
            }
        default:
            return state;
    }
}