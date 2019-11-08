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
import updateUser from '../actions/updateUser'
import { clearCurrentProject } from '../actions/clearCurrentProject'

class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            newProject: false,
            menuOpen: false,
            selectExpert: false,
            newComment: false
        }
    }

    componentDidMount() {
        (this.props.user.novice_projects.length && this.props.expert) && this.setState({newProject: true})
    }

    componentDidUpdate() {
        if (this.props.expert) {
            this.setState({newProject: false})
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

    handleModeSwitch = (type) => {
        this.props.updateUser(this.props.user.id)
        this.props.clearCurrentProject()
        history.push(`/${type}-dashboard`)
        this.closeMenu()
    }

    renderMenuProjectList = (projectType) => {
        if(projectType === 'expertProjects') {
            return this.props[projectType].map( (project, index)=> {
                if(project.expert_status === 'accepted') {
                    return <ProjectList key={index} project={project} handleProjectClick={this.handleProjectClick}/>
                }
            })
        } else {
            return this.props[projectType].map( (project, index)=> <ProjectList key={index} project={project} handleProjectClick={this.handleProjectClick}/>)
        }
    }

    handleHomeClick = () => {
        this.props.clearCurrentProject()
        this.closeMenu()
    }

    render() {
        const { user, project, expert } = this.props
        let projectType

        if(project) {
            var { id, project_type_id } = this.props.project
        }
        
        if(this.props.expert) {
            projectType = 'expertProjects'
        } else {
            projectType = 'noviceProjects'
        }

        return ( 
            <>
                <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                    <a className="menu-item" onClick={this.handleHomeClick}>Home</a>
                    <p id='projects'>Projects</p>
                    {this.renderMenuProjectList(projectType)}
                    <br></br>
                    {!expert && <p className='menu-item' onClick={() => this.toggleModal('newProject')}>Create New Project</p>}
                    {(user.expert_ins.length && !expert) && <p className='menu-item' onClick={() => this.handleModeSwitch('expert')}>Switch to Expert</p>}
                    {expert && <p className='menu-item' onClick={() => this.handleModeSwitch('novice')}>Switch to Novice</p>}
                    <p className='menu-item' onClick={this.props.logout}>Logout</p>
                    <img alt='current user' id='user-image' src={`${process.env.REACT_APP_API_URL}${this.props.user.image}`}></img>
                </Menu>
                { !project && <ProjectCardContainer projectType={projectType} expert={expert} /> }
                { project && <div id='dashboard-container' className='container'>
                                            <div className='row'>
                                                <div className='col-lg-8 col-sm-12'>
                                                    <div className='row border-bottom border-dark'>
                                                        <MaterialsContainer />
                                                    </div>
                                                    <div className='row mt-3'>
                                                    <TaskContainer />
                                                    </div>
                                                </div>
                                                <div id='right-dashboard' className='col-lg-4 col-sm-12 border-left border-dark'>
                                                    <DetailsContainer expert={expert} toggleModal={this.toggleModal}/>
                                                    <ChatContainer />
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
                    <SelectExpert projectTypeId={project_type_id} projectId={id} toggleModal={this.toggleModal} />
                </Modal>
            </>
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
 
export default connect(mapStateToProps, { logout, fetchProject, updateUser, clearCurrentProject })(Dashboard);