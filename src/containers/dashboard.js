import React from 'react';
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import history from '../history';

import { leaveChatRoom } from '../functions/leaveChatRoom'
import { enterChatRoom } from '../functions/enterChatRoom'

import TaskContainer from './taskContainer'
import DetailsContainer from './detailsContainer'
import MaterialsContainer from './materialsContainer'
import ChatContainer from './chatContainer'
import ProjectNewForm from './projectNewForm'
import ProjectCardContainer from './projectCardContainer'

import SelectExpert from '../components/selectExpert'
import ProjectList from '../components/projectList'

import { logout } from '../actions/logout'
import { fetchProject } from '../actions/fetchProject'
import updateUser from '../actions/updateUser'
import { clearCurrentProject } from '../actions/clearCurrentProject'

class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            newProject: !props.user.novice_projects.length,
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

    projectTypeToWord = (projectTypeId) => {
        switch(projectTypeId) {
            case 1:
                return ' Painting';
            case 2:
                return ' Plumbing';
            case 3:
                return 'n Electrical';
            case 4:
                return ' Carpentry';
            case 5: 
                return ' Flooring';
            case 6:
                return ' Landscaping';
            default:
                return ' Painting';
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
        this.props.project && leaveChatRoom(this.props.socket, this.props.project.chat_room)
        this.props.fetchProject(project, this.closeMenu.bind(this))
        console.log('dashboard handle project click chat_room', console.log(project.chat_room))
        enterChatRoom(this.props.socket, project.chat_room)
    }

    handleModeSwitch = (type) => {
        this.props.project && leaveChatRoom(this.props.socket, this.props.project.chat_room)
        this.props.updateUser(this.props.user.id)
        this.props.clearCurrentProject()
        history.push(`/${type}-dashboard`)
        this.closeMenu()
    }

    renderMenuProjectList = (projectType) => {
        if(projectType === 'expertProjects') {
            return this.props[projectType].map( (project, index)=> {
                if(project.expert_status === 'accepted' && project.is_complete !== true) {
                    return <ProjectList key={index} project={project} handleProjectClick={this.handleProjectClick}/>
                }
            })
        } else {
            return this.props[projectType].map( (project, index)=> {
                if(project.is_complete !== true) {
                    return <ProjectList key={index} project={project} handleProjectClick={this.handleProjectClick}/>
                } 
            })
        }
    }

    handleHomeClick = () => {
        this.props.project && leaveChatRoom(this.props.socket, this.props.project.chat_room)
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
                    <h5 id='projects'>Projects</h5>
                    {this.renderMenuProjectList(projectType)}
                    <br></br>
                    {!expert && <p className='menu-item' onClick={() => this.toggleModal('newProject')}>Create New Project</p>}
                    {(user.expert_ins.length && !expert) && <p className='menu-item' onClick={() => this.handleModeSwitch('expert')}>Switch to Expert</p>}
                    {expert && <p className='menu-item' onClick={() => this.handleModeSwitch('novice')}>Switch to Novice</p>}
                    <p className='menu-item' onClick={() => this.props.logout(this.props.socket)}>Logout</p>
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
                                                    <TaskContainer handleHomeClick={this.handleHomeClick}/>
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
                        {`Choose a${this.projectTypeToWord(project_type_id)} Expert to Work With`}
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
        project: state.ProjectReducer.currentProject,
        socket: state.SocketReducer.socket
    }
}
 
export default connect(mapStateToProps, { logout, fetchProject, updateUser, clearCurrentProject })(Dashboard);