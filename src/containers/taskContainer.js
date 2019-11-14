import React from 'react';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import CompleteProject from './completeProject';

import TaskListItem from '../components/taskListItem'
import TaskNewForm from '../components/taskNewForm'
import TaskEditForm from '../components/taskEditForm'
import DisplayComments from '../components/displayComments'

import { fetchProject } from '../actions/fetchProject'
import { newComment } from '../actions/newComment'
import { updateTask } from '../actions/updateTask'

class TaskContainer extends React.PureComponent {
        state = { 
            showNewModal: false,
            showEditModal: false,
            showCommentModal: false,
            showCompleteModal: false,
         }

    componentDidMount() {
        this.setState({
            ...this.state,
            projectComplete: this.checkProjectComplete()
        })
    }

    componentDidUpdate(prevProps) {
        console.log('task container props', prevProps.taskCount, this.props.taskCount)
        if(prevProps.project.id !== this.props.project.id) {
            console.log('task container did update if', prevProps)
            this.setState({
                ...this.state,
                focusTask: null,
                newTask: false,
                projectComplete: this.checkProjectComplete()
            })
        }
    }

    checkProjectComplete = () => {
        if(this.props.project.tasks.length > 0) {
            for(let i = 0; i < this.props.project.tasks.length; i++) {
                if (!this.props.project.tasks[i].is_complete) {
                    return false
                }
            }
            return true
        }
        return false
    }

    setStateAndSocket = (tasks) => {
        const projectId = this.props.project.id
        this.props.socket.emit('sendUpdateTask', tasks, projectId)
        console.log('setStateandSocket', projectId)
        this.setState({
            ...this.state,
            showNewModal: false,
            newTask: false,
            showEditModal: false,
            showCommentModal: false,
            showDisplayModal: false,
            focusTask: null,
            projectComplete: this.checkProjectComplete()
        })
    }

    handleDeleteClick = () => {
        if (window.confirm("Do you really want to delete this task?")) { 
            fetch(`${process.env.REACT_APP_API_URL}/tasks/${this.state.focusTask.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("jwt")
                }
            })
            .then(resp => resp.json())
            .then(tasks => {
                this.props.socket.emit('sendUpdateTask', tasks, this.props.project.id)
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
        this.props.updateTask({ project_id: this.props.project.id, text, time_required: time, is_complete: false }, 'POST', 'tasks', this.setStateAndSocket)
    }

    handleDoneEditClick = (id, text, time, isComplete) => {
        this.props.updateTask({ project_id: this.props.project.id, text, time_required: time, is_complete: isComplete }, 'PATCH', `tasks/${id}`, this.setStateAndSocket)
    }

    handleNewClick = () => {
        this.setState({
            ...this.state,
            showNewModal: !this.state.showNewModal,
            newTask: true
        })
    }

    handleDoneCommentClick = (text) => {
        const data = {text, commentOn: this.state.focusTask.id, userId: this.props.user.id, projectId: this.props.project.id}
        this.props.newComment('task', data)
        this.setState({
            ...this.state,
            focusTask: null,
            showCommentModal: !this.state.showCommentModal
        })
    }

    handleClick = (task, type) => {
        this.setState({
            ...this.state,
            focusTask: task,
            [`show${type}Modal`]: !this.state[`show${type}Modal`]
        })
    }

    toggleComplete = () => {
        this.setState({
            ...this.state,
            projectComplete: !this.state.projectComplete
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
            {this.state.focusTask &&    <DisplayComments 
                                            task={this.state.focusTask}
                                            show={this.state.showDisplayModal} 
                                            handleClick={this.handleClick}
                                            handleDoneCommentClick={this.handleDoneCommentClick}
                                        />}
            <CompleteProject show={this.state.projectComplete} toggleComplete={this.toggleComplete} handleHomeClick={this.props.handleHomeClick}/>
            <button id='new-task' className='btn-primary' onClick={this.handleNewClick}>Add a Task</button>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        project: state.ProjectReducer.currentProject,
        user: state.UserReducer.currentUser,
        socket: state.SocketReducer.socket,
        taskCount: state.ProjectReducer.taskCount,
        requesting: state.ProjectReducer.requesting
    }
}
 
export default connect(mapStateToProps, { fetchProject, newComment, updateTask })(TaskContainer);