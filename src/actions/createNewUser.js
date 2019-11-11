import history from "../history";
import io from 'socket.io-client';
var socket = io('https://diyhelper.herokuapp.com/');

export function createNewUser(user) {
    const formData = new FormData()
    for(let key in user) {
        formData.append(key, user[key])
    }

    return (dispatch) => {
        dispatch({type: 'START_CREATE_USER_REQUEST'})
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: 'POST',
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
            const info = { user, socket }
            localStorage.setItem("jwt", user.jwt)
            localStorage.setItem("userId", user.id);
            dispatch({ type: "LOGIN", info})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}