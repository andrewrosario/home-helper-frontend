export function dispatchTask(tasks) {
    console.log('dispatch task finish update task')
    return (dispatch) => {
        dispatch({type: 'FINISH_UPDATE_TASK', tasks})
    }
}