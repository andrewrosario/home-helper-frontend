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
            socket.on("receiveUpdateMaterials", id => {
                console.log('receive update materials', id)
                fetchProject(id)
            })
            socket.on("receiveMessage", data => {
                console.log('receive update message', data.chat_room_id)
                fetchProject(data.chat_room_id)
            })
            socket.on("receiveUpdateTask", (id) => {
                console.log('receive update task', id)
                fetchProject(id)
            })
            
            dispatch({ type: "LOGIN", info})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}




