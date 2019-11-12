export default function SocketReducer( state = { socket: null }, action) {
    switch (action.type) {
        case 'OPEN_SOCKET':
            console.log('open socket reducer', action)
            return {
                ...state,
                socket: action
            }
        default:
            return state;
    }
}