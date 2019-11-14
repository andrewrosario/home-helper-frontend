import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

function MaterialListItem(props) {
    const { name, amount, amount_unit, cost, comments} = props.material

    return ( 
        
        <tbody>
            <tr>
                <td>{name}</td>
                <td>{amount} - {amount_unit}</td>
                <td>${cost}</td>
                <td>
                    <div className='fa-lg'>
                        <span className="fa-layers fa-fw">
                            <FontAwesomeIcon icon={faCommentAlt} onClick={() => props.handleClick(props.material, 'Comment')} />
                            {comments.length && <span className="fa-layers-counter fa-s">{comments.length}</span>}
                        </span>
                    </div>
                </td>
                <td>
                    <img onClick={() => props.handleClick(props.material, 'Edit')} className='edit-button' src='./edit_button.png' alt='edit'/>
                </td>
            </tr>
        </tbody>
    );
}

export default MaterialListItem;