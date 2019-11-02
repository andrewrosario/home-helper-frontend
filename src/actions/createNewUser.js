import history from "../history";

export function createNewUser(user) {
    return (dispatch) => {
        dispatch({type: 'START_CREATE_USER_REQUEST'})
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(user)
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
            localStorage.setItem("userId", user.user.id);
            dispatch({ type: "LOGIN", user})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}