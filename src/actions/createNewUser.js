import history from "../history";

export function createNewUser(user) {
    const formData = new FormData()
    for(let key in user) {
        formData.append(key, user[key])
    }
    console.log('formData', formData)
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
            localStorage.setItem("jwt", user.jwt)
            localStorage.setItem("userId", user.id);
            dispatch({ type: "LOGIN", user})
            history.push('/novice-dashboard')
        })
        .catch(error => console.log(error))
    }
}