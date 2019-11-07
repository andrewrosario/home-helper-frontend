import React from 'react';

function MaterialListItem(props) {
    const {id, name, amount, amount_unit, cost, comments} = props.material

    return ( 
        
        <tbody>
            <tr>
                <td>{name}</td>
                <td>{amount} - {amount_unit}</td>
                <td>${cost}</td>
                <td>
                    <img onClick={() => props.handleClick(props.material, 'Comment')} className='comment-button' src='./comment-icon.png' alt='comment'/>
                    <div className='comment-button comment-count' onClick={() => props.handleClick(props.material, 'Display')}>{comments.length}</div>
                </td>
                <td>
                    <img onClick={() => props.handleClick(props.material, 'Edit')} className='edit-button' src='./edit_button.png' alt='edit'/>
                </td>
            </tr>
        </tbody>
    );
}

export default MaterialListItem;