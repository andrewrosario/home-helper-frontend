export function dispatchMaterial(materials) {
    return (dispatch) => {
        dispatch({type: 'UPDATE_MATERIALS', materials})
    }
}