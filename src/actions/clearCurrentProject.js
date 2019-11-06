export function clearCurrentProject() {
    return(dispatch) => {
        dispatch({type: 'CLEAR_CURRENT_PROJECT'})
    }
}