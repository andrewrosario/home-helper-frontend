export default function updateUser(id) {
    return (dispatch, getState) => {
        dispatch({type: 'START_UPDATE_REQUEST'})
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }})
        .then(resp => resp.json())
        .then(user => {
            dispatch({ type: "LOGIN", user})
        })
    } 
}