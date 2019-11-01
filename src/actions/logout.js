import history from "../history";

export function logout() {
    return (dispatch) => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
    }
}
