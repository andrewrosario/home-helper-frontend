import React from 'react';
import TaskListItem from '../components/taskListItem'
import TaskNewForm from '../components/taskNewForm'
import TaskEditForm from '../components/taskEditForm'
import { Table } from 'react-bootstrap';

class TaskContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { 
            project_id: props.projectId,
            tasks: props.tasks,
            showNewModal: false,
            showEditModal: false
         }
    }

    componentDidUpdate() {
        if(this.props.projectId !== this.state.project_id) {
            this.setState({
                ...this.state,
                tasks: this.props.tasks,
                project_id: this.props.projectId,
                editTask: null,
                newTask: false
            })
        }
    }

    fetchPostPatch = (text, time, isComplete, method, path) => {
        const projectId = this.state.project_id
        fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                task: {
                    text: text,
                    time_required: time,
                    project_id: projectId,
                    is_complete: isComplete
                }
            })
        })
        .then(resp => resp.json())
        .then(tasks => {
            this.setState({
                ...this.state,
                tasks: tasks,
                showNewModal: false,
                newTask: false,
                showEditModal: false,
                editTask: null
            })
        })
    }

    handleDeleteClick = () => {
        if (window.confirm("Do you really want to delete this task?")) { 
            fetch(`${process.env.REACT_APP_API_URL}/tasks/${this.state.editTask.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("jwt")
                }
            })
            .then(resp => resp.json())
            .then(tasks => {
                this.setState({
                    ...this.state,
                    tasks: tasks,
                    showNewModal: false,
                    newTask: false,
                    showEditModal: false,
                    editTask: null
                })
            })
          }
    }

    handleDoneNewClick = (text, time) => {
        this.fetchPostPatch(text, time, false, 'POST', 'tasks')
    }

    handleDoneEditClick = (id, text, time, isComplete) => {
        this.fetchPostPatch(text, time, isComplete, 'PATCH', `tasks/${id}`)
    }

    handleNewClick = () => {
        this.setState({
            ...this.state,
            showNewModal: !this.state.showNewModal,
            newTask: true
        })
    }

    handleEditClick = (task) => {
        this.setState({
            ...this.state,
            editTask: task,
            showEditModal: !this.state.showEditModal
        })
    }

    render() { 
        return ( 
            <div id='tasks' className='col-12'>
            <h3>Tasks</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Complete</th>
                        <th>Description</th>
                        <th>Time Required</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                {this.state.tasks && this.state.tasks.map( task => <TaskListItem  
                                                                        key={task.id} 
                                                                        task={task} 
                                                                        handleDoneEditClick={this.handleDoneEditClick} 
                                                                        handleEditClick={this.handleEditClick}
                                                                    />)}
            </Table>
            {this.state.editTask && <TaskEditForm 
                                        task={this.state.editTask} 
                                        show={this.state.showEditModal} 
                                        handleDoneEditClick={this.handleDoneEditClick}
                                        handleEditClick={this.handleEditClick}
                                        handleDeleteClick={this.handleDeleteClick}
                                        />}
            {this.state.newTask &&  <TaskNewForm 
                                        show={this.state.showNewModal} 
                                        handleDoneEditClick={this.handleDoneNewClick} 
                                        handleNewClick={this.handleNewClick}
                                    />}
            <button id='new-task' onClick={this.handleNewClick}>Add a Task</button>
            </div>
         );
    }
}
 
export default TaskContainer;