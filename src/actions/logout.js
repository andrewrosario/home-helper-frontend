import history from "../history";

export function logout() {
    console.log('logout action')
    return (dispatch) => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
    }
}
