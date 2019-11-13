import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

function TaskListItem(props) {
    const {id, text, time_required, is_complete, comments} = props.task
    return ( 
        <tbody>
            <tr>
                <td><Form.Check className='new-task task-done' onChange={() => props.handleDoneEditClick(id, text, time_required, !is_complete)} defaultChecked={is_complete} /></td>
                <td>{text}</td>
                <td>{time_required} mins</td>
                <td>
                    <div className='fa-lg'>
                        <span className="fa-layers fa-fw">
                            <FontAwesomeIcon icon={faCommentAlt} onClick={() => props.handleClick(props.task, 'Comment')} />
                            <span className="fa-layers-counter fa-s" onClick={() => props.handleClick(props.task, 'Display')}>{comments.length}</span>
                        </span>
                    </div>
                        {/* <img onClick={() => props.handleClick(props.task, 'Comment')} className='comment-button' src='./comment-icon.png' alt='comment'/>
                        <div className='comment-button comment-count' onClick={() => props.handleClick(props.task, 'Display')}>{comments.length}</div> */}
                </td>
                <td><img onClick={() => props.handleClick(props.task, 'Edit')} className='edit-button' src='./edit_button.png' alt='edit a task'/></td>
            </tr>
        </tbody>
    );
}

export default TaskListItem;

