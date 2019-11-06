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
import ProjectList from '../components/projectList'
import history from '../history';

class Dashboard extends React.PureComponent {
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

    handleProjectClick = (project) => {
        this.props.fetchProject(project, this.closeMenu.bind(this))
    }

    render() {
        if(this.props.project) {
            var { id, tasks, materials, project_type_id } = this.props.project
        }
        
        if(this.props.expert) {
            var projectType = 'expertProjects'
        } else {
            var projectType = 'noviceProjects'
        }

        return ( 
            <div>
                <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                    <a className="menu-item" href="/">Home</a>
                    <p>Projects</p>
                    {this.props[projectType].map( (project, index)=> <ProjectList key={index} project={project} handleProjectClick={this.handleProjectClick}/>)}
                    <br></br>
                    <p className='menu-item' onClick={() => this.toggleModal('newProject')}>Create New Project</p>
                    {this.props.expertProjects.length && <p className='menu-item' onClick={() => history.push('/expert-dashboard')}>Switch to Expert</p>}
                    <p className='menu-item' onClick={this.props.logout}>Logout</p>
                    <img id='user-image' src={`${process.env.REACT_APP_API_URL}${this.props.user.image}`}></img>
                </Menu>
                { !this.props.project && <ProjectCardContainer projectType={projectType} /> }
                { this.props.project && <div id='dashboard-container' className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='row border-bottom border-dark'>
                                <MaterialsContainer />
                            </div>
                            <div className='row mt-3'>
                               <TaskContainer />
                            </div>
                        </div>
                        <div id='right-dashboard' className='col-4 border-left border-dark'>
                            <div className='row'>
                               <DetailsContainer expert={this.props.expert} toggleModal={this.toggleModal}/>
                            </div>
                            <div className= ''>
                                <ChatContainer />
                            </div>
                        </div>
                    </div>
                </div> }

                <Modal show={this.state.newProject} onHide={() => this.toggleModal('newProject')}>
                    <Modal.Header closeButton>
                    {this.props[projectType].length > 0 ? <Modal.Title>Create a New Project</Modal.Title> : <Modal.Title>Welcome! Join our Community by Creating a Project</Modal.Title>}
                    </Modal.Header>
                    <ProjectNewForm closeProjectModal={() => this.toggleModal('newProject')} />
                </Modal>

                <Modal show={this.state.selectExpert} onHide={() => this.toggleModal('selectExpert')}>
                    <Modal.Header closeButton>
                        Choose an Expert to Work With
                    </Modal.Header>
                    <div id='scroll' className='row'>
                        <SelectExpert projectTypeId={project_type_id} projectId={id} toggleModal={this.toggleModal.bind(this)} />
                    </div>
                </Modal>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        user: state.UserReducer.currentUser,
        noviceProjects: state.UserReducer.currentUser.novice_projects,
        expertProjects: state.UserReducer.currentUser.expert_projects,
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { logout, fetchProject })(Dashboard);