import React from 'react';
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import TaskContainer from './taskContainer'
import DetailsContainer from './detailsContainer'
import MaterialsContainer from './materialsContainer'
import ChatContainer from './chatContainer'
import ProjectCardContainer from './projectCardContainer'
import { slide as Menu } from 'react-burger-menu'
import ProjectNewForm from './projectNewForm'

class NoviceDashboard extends React.PureComponent {
    constructor(props) {
        super(props)
        const showModal = props.user.novice_projects.length ? false : true
        this.state = {
            currentProject: null,
            showCreateProject: showModal,
            menuOpen: false
        }
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
    }

    closeMenu () {
        this.setState({menuOpen: false})
    }

    toggleCreateProject = () => {
        this.setState({
            ...this.state,
            showCreateProject: !this.state.showCreateProject
        })
        this.closeMenu()
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
            this.closeMenu()
        })
    }

    closeProjectModal = () => {
        this.setState({
            ...this.state,
            showCreateProject: !this.state.showCreateProject
        })
    }

    render() { 
        return ( 
            <div className='mt-2'>

                <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                    <a className="menu-item" href="/">Home</a>
                    <p>Projects</p>
                    {this.props.novice_projects.map( (project, index)=> <p key={index} className='menu-item' onClick={() => this.handleProjectClick(project.id)}>{project.title}</p>)}
                    <br></br>
                    <p className='menu-item' onClick={this.toggleCreateProject}>Create New Project</p>
                    <p className='menu-item' onClick={this.logout}>Logout</p>
                </Menu>

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
                    <ProjectNewForm closeProjectModal={this.closeProjectModal} />
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