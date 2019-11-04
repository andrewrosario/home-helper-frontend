export default function updateProject(projectId, expertId) {
    return (dispatch) => {
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
                expert_id: sentExpertId
            })
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: 'FINISH_UPDATE_PROJECT', data})
        })
    }
}