import React, { Component } from 'react';
import TaskListItem from '../components/taskListItem'
import TaskEditForm from '../components/taskEditForm'
import { Table } from 'react-bootstrap';
// import { thisTypeAnnotation } from '@babel/types';


class TaskContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { 
            project_id: props.projectId,
            tasks: props.tasks,
            showNewTaskModal: false
         }
    }

    // componentDidMount() {
    //     this.setState({
    //         ...this.state,
    //         tasks: this.props.project.tasks
    //     })
    // }

    componentDidUpdate(prevProps) {
        console.log('state', this.state)
        console.log('prevProps', prevProps)
        console.log('this.props', this.props)
        if(this.props.projectId !== this.state.project_id) {
            this.setState({
                ...this.state,
                tasks: this.props.tasks,
                project_id: this.props.projectId
            })
        }
    }

    handleAddTaskClick = () => {
        this.setState({
            ...this.state,
            showNewTaskModal: !this.state.showNewTaskModal
        })
    }

    handleDoneEditTaskClick = (text, time) => {
        const projectId = this.state.project_id
        fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                task: {
                    text: text,
                    time_required: time,
                    project_id: projectId
                }
            })
        })
        .then(resp => resp.json())
        .then(tasks => {
            console.log('tasks', tasks)
            this.setState({
                ...this.state,
                tasks: tasks,
                showNewTaskModal: false
            })
        })
    }

    render() { 
        return ( 
            <div id='tasks' className='col-8 container'>
            <h1>Tasks</h1>
            <Table>
                {this.state.tasks && this.state.tasks.map( task => <TaskListItem  key={task.id} task={task}/>)}
            </Table>
            <TaskEditForm show={this.state.showNewTaskModal} handleDoneEditTaskClick={this.handleDoneEditTaskClick} handleAddTaskClick={this.handleAddTaskClick}/>
            <button id='new-task' onClick={this.handleAddTaskClick}>Add a Task</button>
            </div>
         );
    }
}
 
export default TaskContainer;