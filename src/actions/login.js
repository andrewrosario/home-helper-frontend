import history from "../history";
import io from 'socket.io-client';
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
            localStorage.setItem("jwt", user.jwt)
            localStorage.setItem("userId", user.id);
            socket.on('connect', () => {})
            dispatch({ type: "LOGIN", user})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}


