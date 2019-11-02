import React from 'react';
import NavBar from './navbar'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import NewProject from './newProject'
import TaskContainer from './taskContainer'
import DetailsContainer from './detailsContainer'
import MaterialsContainer from './materialsContainer'
import ChatContainer from './chatContainer'
import ProjectCardContainer from './projectCardContainer'

class NoviceDashboard extends React.PureComponent {
    constructor(props) {
        super(props)
        const showModal = props.user.novice_projects.length ? false : true
        this.state = {
            currentProject: null,
            showCreateProject: showModal
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
                currentProject: data.project,
            })
        })
    }

    render() { 
        return ( 
            <div className='mt-2'>
                <NavBar 
                    projects={this.props.user.novice_projects} 
                    toggleCreateProject={this.toggleCreateProject} 
                    handleProjectClick={this.handleProjectClick}
                />

                { !this.state.currentProject && <ProjectCardContainer /> }
                { this.state.currentProject && <div id='dashboard-container' className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='row border-bottom border-dark'>
                                <MaterialsContainer projectId={this.state.currentProject.id} materials={this.state.currentProject.materials}/>
                            </div>
                            <div className='row mt-3'>
                               <TaskContainer projectId={this.state.currentProject.id} tasks={this.state.currentProject.tasks} />
                            </div>
                        </div>
                        <div className='col-4 border-left border-dark'>
                            <div className='row'>
                               <DetailsContainer />
                            </div>
                            <div className= 'row'>
                                <ChatContainer />
                            </div>
                        </div>
                    </div>
                </div> }

                <Modal show={this.state.showCreateProject} onHide={this.toggleCreateProject}>
                    <Modal.Header closeButton>
                    {this.props.novice_projects.length > 0 ? <Modal.Title>Create a New Project</Modal.Title> : <Modal.Title>Welcome! Join our Community by Creating a Project</Modal.Title>}
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
        novice_projects: state.UserReducer.currentUser.user.novice_projects
    }
}
 
export default connect(mapStateToProps)(NoviceDashboard);