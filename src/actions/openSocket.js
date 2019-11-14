export function openSocket(socket) {
    return (dispatch) => {
        dispatch({
            type: 'OPEN_SOCKET', 
            socket: socket
        })
    }
}