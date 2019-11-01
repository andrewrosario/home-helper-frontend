import React from 'react';
import { Form } from 'react-bootstrap';

function TaskListItem(props) {

    return ( 
        <tbody>
            <tr>
                <td><Form.Check className='new-task task-done'/></td>
                <td>{props.task.text}</td>
                <td>{props.task.time_required}</td>
            </tr>
        </tbody>
    );
}

export default TaskListItem;

