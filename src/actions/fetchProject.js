import io from 'socket.io-client';
var socket = io('https://diyhelper.herokuapp.com/');

export function fetchProject(project, closeMenu) {
    return (dispatch, getState) => {
        console.log('getstate', getState())
        console.log('project', project)
        console.log('close menu', closeMenu)
        dispatch({type: 'START_FETCH_PROJECT'})
        fetch(`${process.env.REACT_APP_API_URL}/projects/${project.id}`, {
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }})
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: "FINISH_FETCH_PROJECT", data})
            closeMenu && closeMenu()
        })
    }
}