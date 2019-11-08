export function newComment(commentType, data, socketUpdate) {
    const { text, userId, commentOn } = data
    return(dispatch) => {
        dispatch({type: 'START_NEW_COMMENT'})
        fetch(`${process.env.REACT_APP_API_URL}/comments/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                comment: {
                    [`${commentType}_id`]: commentOn,
                    text: text,
                    user_id: userId
                }
            })
        })
        .then(resp => resp.json())
        .then(comment => {
            dispatch({type: "FINISH_NEW_COMMENT", comment, commentType: commentType})
            socketUpdate()
        })
    }
}