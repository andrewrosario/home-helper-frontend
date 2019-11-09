import history from "../history";
import socketIOClient from "socket.io-client"

// const endpoint = "http://127.0.0.1:8000"
// const socket = socketIOClient(endpoint)

var socket = io();

export function logout() {
    return (dispatch) => {
        dispatch({type: 'LOGOUT'})
        socket.close()
        history.push('/')
    }
}
