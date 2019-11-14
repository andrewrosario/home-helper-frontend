export default function SocketReducer( state = { socket: null }, action) {
    switch (action.type) {
        case 'OPEN_SOCKET':
            return {
                ...state,
                socket: action.socket
            }
        case 'LOGOUT':
            return {
                ...state,
                socket: null
            }
        default:
            return state;
    }
}