import { leaveChatRoom } from '../functions/leaveChatRoom'
import { enterChatRoom } from '../functions/enterChatRoom'

export default function updateProject(projectId, expertId, expertStatus) {
    return (dispatch, getState) => {
        const { ProjectReducer, SocketReducer } = getState()
        ProjectReducer.currentProject && leaveChatRoom(SocketReducer.socket, ProjectReducer.currentProject.chat_room)
        dispatch({type: 'START_UPDATE_PROJECT'})
        let sentExpertId
        if(expertId) {
            sentExpertId = expertId
        } else {
            sentExpertId = 'nil'
        }
        fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                expert_id: sentExpertId,
                expert_status: expertStatus
            })
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: 'FINISH_UPDATE_PROJECT', data})
            enterChatRoom(SocketReducer.socket, data.chat_room)
        })
    }
}