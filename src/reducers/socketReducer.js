export default function SocketReducer( state = { socket: null }, action) {
    console.log('socketReducer Action', action.type)
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