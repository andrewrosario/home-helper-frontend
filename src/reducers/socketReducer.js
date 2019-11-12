export default function SocketReducer( state = { socket: null }, action) {
    switch (action.type) {
        case "OPEN_SOCKET":
            console.log('open socket', action)
            return {
                socket: action.socket,
            }
        default:
            return state;
    }
}