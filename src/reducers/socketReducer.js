export default function SocketReducer( state = { socket: null }, action) {
    switch (action.type) {
        case "OPEN_SOCKET":
            return {
                socket: action.socket,
            }
        default:
            return state;
    }
}