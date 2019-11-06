import React from 'react';
import TaskListItem from '../components/taskListItem'
import TaskNewForm from '../components/taskNewForm'
import TaskEditForm from '../components/taskEditForm'
import { Table } from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux'
import { fetchProject } from '../actions/fetchProject'
const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint)

class TaskContainer extends React.PureComponent {
        state = { 
            showNewModal: false,
            showEditModal: false
         }

    componentDidMount() {
        socket.on('connect', () => {})
        socket.on("receiveUpdateTask", data => {
            console.log('receiveUpdateTask', data)
            this.props.fetchProject(this.props.project)
        })
        socket.emit('room', `task_id_${this.props.project.id}`)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.project.id !== this.props.project.id) {
            this.setState({
                ...this.state,
                editTask: null,
                newTask: false
            })
        }
    }

    fetchPostPatch = (text, time, isComplete, method, path) => {
        const projectId = this.props.project.id
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
        .then(() => {
            socket.emit('sendUpdateTask', this.props.project.id)
            this.setState({
                ...this.state,
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
            .then( () => {
                socket.emit('sendUpdateTask', this.props.project.id)
                this.setState({
                    ...this.state,
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
        
        const { tasks } = this.props.project
        return ( 
            <div id='tasks' className='col-12'>
            <h3>Tasks</h3>
            <Table>
                <thead>
                    <tr>
                        <th width='1%'>Complete</th>
                        <th>Description</th>
                        <th width='15%'>Time</th>
                        <th width='1%'>Edit</th>
                    </tr>
                </thead>
                {tasks && tasks.map( task => <TaskListItem  
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

function mapStateToProps(state){
    return {
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { fetchProject })(TaskContainer);