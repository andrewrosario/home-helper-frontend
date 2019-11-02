import React from 'react';

function MaterialListItem(props) {

    return ( 
        <tbody>
            <tr>
                <td>{props.material.name}</td>
                <td>{props.material.amount} {props.material.amount_unit}</td>
                <td>${props.material.cost}</td>
                <td><img onClick={() => props.handleEditClick(props.material)} className='edit-button' src='./edit_button.png' alt='edit a task'/></td>
            </tr>
        </tbody>
    );
}

export default MaterialListItem;