import React from 'react';
import { Form } from 'react-bootstrap';

function TaskListItem(props) {
    const {id, text, time_required, is_complete, comments} = props.task
    return ( 
        <tbody>
            <tr>
                <td><Form.Check className='new-task task-done' onChange={() => props.handleDoneEditClick(id, text, time_required, !is_complete)} defaultChecked={is_complete} /></td>
                <td>{text}</td>
                <td>{time_required} mins</td>
                <td>
                    <div className='comment-div'>
                        <div className='fa-4x comment-button'>
                            <span className="fa-layers fa-fw">
                                <i className="far fa-comment-alt" onClick={() => props.handleClick(props.task, 'Comment')}></i>
                                <span className="fa-layers-counter" onClick={() => props.handleClick(props.task, 'Display')}>{comments.length}</span>
                            </span>
                        </div>
                        {/* <img onClick={() => props.handleClick(props.task, 'Comment')} className='comment-button' src='./comment-icon.png' alt='comment'/>
                        <div className='comment-button comment-count' onClick={() => props.handleClick(props.task, 'Display')}>{comments.length}</div> */}
                    </div>
                </td>
                <td><img onClick={() => props.handleClick(props.task, 'Edit')} className='edit-button' src='./edit_button.png' alt='edit a task'/></td>
            </tr>
        </tbody>
    );
}

export default TaskListItem;

