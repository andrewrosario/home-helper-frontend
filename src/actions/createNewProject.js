import { leaveChatRoom } from '../functions/leaveChatRoom'
import { enterChatRoom } from '../functions/enterChatRoom'

export function createNewProject(project) {
    const formData = new FormData()
    const { user, name, description, type, before_photos } = project
    formData.append('novice_id', user)
    formData.append('title', name)
    formData.append('description', description)
    formData.append('project_type_id', parseInt(type))

    for (const file of before_photos) {
        formData.append('before_photos[]', file, file.name);
    }

    return (dispatch, getState) => {
        const { ProjectReducer, SocketReducer } = getState()
        ProjectReducer.currentProject && leaveChatRoom(SocketReducer.socket, ProjectReducer.currentProject.chat_room)
        dispatch({type: 'START_CREATE_PROJECT_REQUEST'}, project)
        fetch(`${process.env.REACT_APP_API_URL}/projects`, {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: formData
        })
        .then(resp => {
            if (!resp.ok) {
                throw Error(resp.statusText)
            } else {
                return resp.json()
            }
        })
        .then(user => {
            dispatch({ type: "FINISH_CREATE_PROJECT", user})
            enterChatRoom(SocketReducer.socket, user.novice_projects[user.novice_projects.length - 1])
        })
        .catch(error => console.log(error))
    }
}