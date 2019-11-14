import history from "../history";

export function logout(socket) {
    return (dispatch) => {
        dispatch({type: 'LOGOUT'})
        socket.close()
        history.push('/')
    }
}
