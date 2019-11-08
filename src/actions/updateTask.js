export function updateTask(taskObj, method, path, setStateAndSocket) {
    return (dispatch) => {
        dispatch({type: 'START_UPDATE_TASK'})
        fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: `${method}`,
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify(taskObj)
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: 'FINISH_UPDATE_TASK', data})
            setStateAndSocket()
        })
    }
}