import history from "../history";
import io from 'socket.io-client';
import {fetchProject} from './fetchProject'
var socket = io('https://diyhelper.herokuapp.com/');

export function login(user) {
    return (dispatch) => {
        dispatch({type: 'START_LOGIN_REQUEST'})
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'auth': {
                    'email': user.email,
                    'password': user.password
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
            const info = { user, socket }
            localStorage.setItem("jwt", user.jwt)
            localStorage.setItem("userId", user.id);
            socket.on('connect', () => {})
            socket.on("receiveUpdateMaterials", materials => {
                console.log('receive update materials', materials)
                dispatch({type: 'UPDATE_MATERIALS', materials})
            })
            socket.on("receiveMessage", message => {
                console.log('receive update message', message.chat_room_id)
                // fetchProject(message.chat_room_id)
                dispatch({type: 'RECEIVE_CHAT_MESSAGE', message})
            })
            socket.on("receiveUpdateTask", (tasks) => {
                console.log('receive update task', tasks)
                dispatch({type: 'FINISH_UPDATE_TASKS', tasks})
            })
            
            dispatch({ type: "LOGIN", info})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}




