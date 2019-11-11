export function fetchProject(project, closeMenu) {
    return (dispatch, getState) => {
        const { ProjectReducer, UserReducer } = getState()
        if(ProjectReducer.currentProject) {
            socket.emit('leave', `chat_id_${ProjectReducer.currentProject.chat_room.id}`)
            socket.emit('leave', `task_id_${ProjectReducer.currentProject.chat_room.id}`)
            socket.emit('leave', `materials_id_${ProjectReducer.currentProject.chat_room.id}`)
        }
        dispatch({type: 'START_FETCH_PROJECT'})
        fetch(`${process.env.REACT_APP_API_URL}/projects/${project.id}`, {
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }})
        .then(resp => resp.json())
        .then(data => {
            UserReducer.socket.emit('room', `chat_id_${data.chat_room.id}`)
            UserReducer.socket.emit('room', `task_id_${data.chat_room.id}`)
            UserReducer.socket.emit('room', `materials_id_${data.chat_room.id}`)
            dispatch({type: "FINISH_FETCH_PROJECT", data})
            closeMenu && closeMenu()
        })
    }
}