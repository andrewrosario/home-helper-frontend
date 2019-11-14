export function dispatchMessage(message) {
    return (dispatch) => {
        dispatch({type: 'RECEIVE_CHAT_MESSAGE', message})
    }
}