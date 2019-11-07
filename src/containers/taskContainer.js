import React from 'react';
import TaskListItem from '../components/taskListItem'
import TaskNewForm from '../components/taskNewForm'
import TaskEditForm from '../components/taskEditForm'
import { Table } from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux'
import { fetchProject } from '../actions/fetchProject'
import CommentNewForm from '../components/commentNewForm'
import { newComment } from '../actions/newComment'
import DisplayComments from '../components/displayComments'

const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint)

class TaskContainer extends React.PureComponent {
        state = { 
            showNewModal: false,
            showEditModal: false,
            showCommentModal: false
         }

    componentDidMount() {
        socket.on('connect', () => {})
        socket.on("receiveUpdateTask", data => {
            this.props.fetchProject(this.props.project)
        })
        socket.emit('room', `task_id_${this.props.project.id}`)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.project.id !== this.props.project.id) {
            this.setState({
                ...this.state,
                focusTask: null,
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
                showCommentModal: false,
                showDisplayModal: false,
                focusTask: null
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
                    focusTask: null
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

    handleDoneCommentClick = (text) => {
        const data = {text, commentOn: this.state.focusTask.id, userId: this.props.user.id}
        this.props.newComment('task', data)
        this.setState({
            ...this.state,
            focusTask: null,
            showCommentModal: !this.state.showCommentModal
        })
        socket.emit('sendUpdateTask', this.props.project.id)
    }

    handleClick = (task, type) => {
        this.setState({
            ...this.state,
            focusTask: task,
            [`show${type}Modal`]: !this.state[`show${type}Modal`]
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
                        <th>Comment</th>
                        <th width='1%'>Edit</th>
                    </tr>
                </thead>
                {tasks && tasks.map( task => <TaskListItem  
                                                key={task.id} 
                                                task={task} 
                                                handleDoneEditClick={this.handleDoneEditClick} 
                                                handleClick={this.handleClick}
                                                handleCommentClick={this.handleCommentClick}
                                            />)}
            </Table>
            {this.state.focusTask && <TaskEditForm 
                                        task={this.state.focusTask} 
                                        show={this.state.showEditModal} 
                                        handleDoneEditClick={this.handleDoneEditClick}
                                        handleClick={this.handleClick}
                                        handleDeleteClick={this.handleDeleteClick}
                                        />}
            {this.state.newTask &&  <TaskNewForm 
                                        show={this.state.showNewModal} 
                                        handleDoneEditClick={this.handleDoneNewClick} 
                                        handleNewClick={this.handleNewClick}
                                    />}
            {this.state.focusTask &&    <CommentNewForm 
                                            show={this.state.showCommentModal} 
                                            handleDoneCommentClick={this.handleDoneCommentClick} 
                                            handleClick={this.handleClick}
                                        />}
            {this.state.focusTask &&    <DisplayComments 
                                            task={this.state.focusTask}
                                            show={this.state.showDisplayModal} 
                                            handleClick={this.handleClick}
                                        />}              
            <button id='new-task' onClick={this.handleNewClick}>Add a Task</button>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        project: state.ProjectReducer.currentProject,
        user: state.UserReducer.currentUser
    }
}
 
export default connect(mapStateToProps, { fetchProject, newComment })(TaskContainer);