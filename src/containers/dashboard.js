import React from 'react';
import NavBar from './navbar'
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import NewProject from './newProject';
import TaskContainer from './taskContainer'
import DetailsContainer from './detailsContainer'
import MaterialsContainer from './materialsContainer'
import ChatContainer from './chatContainer';

class NoviceDashboard extends React.PureComponent {
    constructor(props) {
        super(props)
        const showModal = props.user.novice_projects.length ? false : true
        this.state = {
            currentProject: null,
            showCreateProject: showModal,
        }
    }

    toggleCreateProject = () => {
        this.setState({
            ...this.state,
            showCreateProject: !this.state.showCreateProject
        })
    }

    handleProjectClick = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }})
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                ...this.state,
                currentProject: data.project
            })
        })
    }

    render() { 
        return ( 
            <div>
                <NavBar projects={this.props.user.novice_projects} toggleCreateProject={this.toggleCreateProject} handleProjectClick={this.handleProjectClick}/>
                <div id='dashboard-container' className='container'>
                    <div id='tasks-details' className='row'>
                        {this.state.currentProject && <><MaterialsContainer projectId={this.state.currentProject.id} materials={this.state.currentProject.materials}/><ChatContainer /></>}
                        {this.state.currentProject ? <TaskContainer projectId={this.state.currentProject.id} tasks={this.state.currentProject.tasks} /> : <h1>There is No Project Selected, Please Select a Project or Create a new one.</h1>}
                        {this.state.currentProject && <DetailsContainer />}
                    {/* </div>
                    <div id='materials-chat' className='row'> */}
                    </div>
                </div>
                <Modal show={this.state.showCreateProject} onHide={this.toggleCreateProject}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create a New Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewProject toggleCreateProject={this.toggleCreateProject}/>
                    </Modal.Body>
                </Modal>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        user: state.UserReducer.currentUser.user,
        projects: state.UserReducer.currentUser.user.projects
    }
}
 
export default connect(mapStateToProps)(NoviceDashboard);