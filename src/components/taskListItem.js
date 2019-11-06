import React from 'react';
import { Form } from 'react-bootstrap';

function TaskListItem(props) {
    const {id, text, time_required, is_complete} = props.task
    return ( 
        <tbody>
            <tr>
                <td><Form.Check className='new-task task-done' onChange={() => props.handleDoneEditClick(id, text, time_required, !is_complete)} defaultChecked={is_complete} /></td>
                <td>{text}</td>
                <td>{time_required} mins</td>
                <td><img onClick={() => props.handleEditClick(props.task)} className='edit-button' src='./edit_button.png' alt='edit a task'/></td>
            </tr>
        </tbody>
    );
}

export default TaskListItem;

