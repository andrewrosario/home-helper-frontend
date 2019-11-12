export function openSocket(socket) {
    console.log('action open socket', socket)
    return (dispatch) => {
        dispatch({type: 'OPEN_SOCKET'})
    }
}