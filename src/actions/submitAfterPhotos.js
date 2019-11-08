export function submitAfterPhotos(photos, projectId) {
    const formData = new FormData()
    formData.append('expert_status', 'add_photos')

    for (const file of photos) {
        formData.append('after_photos[]', file, file.name);
    }

    return (dispatch) => {
        dispatch({type: 'START_UPDATE_PROJECT'})
        fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: 'FINISH_UPDATE_PROJECT', data})
        })
    }
}