export function createNewProject(project) {
    return (dispatch) => {
        dispatch({type: 'START_CREATE_PROJECT_REQUEST'}, project)
        fetch(`${process.env.REACT_APP_API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                project: {
                    novice_id: project.user,
                    title: project.name,
                    description: project.description,
                    project_type_id: parseInt(project.type)
                }
            })
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

        })
        .catch(error => console.log(error))
    }
}