export function dispatchTask(tasks) {
    return (dispatch) => {
        dispatch({type: 'FINISH_UPDATE_TASK', tasks})
    }
}