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
import { logout } from '../actions/logout'
import { fetchProject } from '../actions/fetchProject'
import SelectExpert from '../components/selectExpert'
import socketIOClient from "socket.io-client";

const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint);

class NoviceDashboard extends React.PureComponent {
    constructor(props) {
        super(props)
        const showModal = props.user.novice_projects.length ? false : true
        this.state = {
            newProject: showModal,
            menuOpen: false,
            selectExpert: false
        }
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
    }

    closeMenu () {
        this.setState({menuOpen: false})
    }

    toggleModal = (modalType) => {
        this.setState({
            ...this.state,
            [modalType]: !this.state[modalType]
        })
        this.closeMenu()
    }

    handleProjectClick = (id) => {
        socket.emit('leave', `chat_id_${this.props.project.chat_id}`)
        this.props.fetchProject(id, this.closeMenu.bind(this))
    }

    render() {
        if(this.props.project) {
            var { id, tasks, materials, project_type_id } = this.props.project
        }
    
        return ( 
            <div className='mt-2'>
                <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                    <a className="menu-item" href="/">Home</a>
                    <p>Projects</p>
                    {this.props.novice_projects.map( (project, index)=> <p key={index} className='menu-item' onClick={() => this.handleProjectClick(project.id)}>{project.title}</p>)}
                    <br></br>
                    <p className='menu-item' onClick={() => this.toggleModal('newProject')}>Create New Project</p>
                    <p className='menu-item' onClick={this.props.logout}>Logout</p>
                    <p>Welcome {this.props.user.name}!</p>
                </Menu>
                { !this.props.project && <ProjectCardContainer /> }
                { this.props.project && <div id='dashboard-container' className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='row border-bottom border-dark'>
                                <MaterialsContainer projectId={id} materials={materials}/>
                            </div>
                            <div className='row mt-3'>
                               <TaskContainer projectId={id} tasks={tasks} />
                            </div>
                        </div>
                        <div className='col-4 border-left border-dark'>
                            <div className='row'>
                               <DetailsContainer toggleModal={this.toggleModal}/>
                            </div>
                            <div className= 'row'>
                                <ChatContainer />
                            </div>
                        </div>
                    </div>
                </div> }

                <Modal show={this.state.newProject} onHide={() => this.toggleModal('newProject')}>
                    <Modal.Header closeButton>
                    {this.props.novice_projects.length > 0 ? <Modal.Title>Create a New Project</Modal.Title> : <Modal.Title>Welcome! Join our Community by Creating a Project</Modal.Title>}
                    </Modal.Header>
                    <ProjectNewForm closeProjectModal={() => this.toggleModal('newProject')} />
                </Modal>

                <Modal show={this.state.selectExpert} onHide={() => this.toggleModal('selectExpert')}>
                    <Modal.Header closeButton>
                        Choose an Expert to Work With
                    </Modal.Header>
                    <SelectExpert projectTypeId={project_type_id} projectId={id} toggleModal={this.toggleModal.bind(this)} />
                </Modal>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        user: state.UserReducer.currentUser.user,
        novice_projects: state.UserReducer.currentUser.user.novice_projects,
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { logout, fetchProject })(NoviceDashboard);