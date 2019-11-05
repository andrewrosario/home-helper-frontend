import history from "../history";

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
            console.log(resp)
            if (!resp.ok) {
                throw Error(resp.statusText)
            } else {
                return resp.json()
            }
        })
        .then(user => {
            console.log(user)
            localStorage.setItem("jwt", user.jwt)
            localStorage.setItem("userId", user.id);
            dispatch({ type: "LOGIN", user})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}


