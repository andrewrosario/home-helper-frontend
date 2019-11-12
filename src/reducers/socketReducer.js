export default function SocketReducer( state = { socket: null }, action) {
    console.log('socketReducer Action', action.type)
    switch (action.type) {
        case 'OPEN_SOCKET':
            console.log('open socket reducer', action.socket)
            return {
                ...state,
                socket: action.socket
            }
        default:
            return state;
    }
}