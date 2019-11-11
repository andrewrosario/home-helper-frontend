import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectCard from '../components/projectCard'
import { Modal } from 'react-bootstrap'

class ProjectCardContainer extends Component {
    state = { 
        pendingProjects: []
    }

    componentDidMount() {
        const projects = []
        this.props.expert && this.props[this.props.projectType].map( (project) => {
            if(project.expert_status === 'pending') {
                projects.push(project)
            }
        })
        this.setState({pendingProjects: projects})
    }

    componentDidUpdate() {
        if(this.props.expert) {
            let projects = []
            this.props.expertProjects.map( (project) => {
                if(project.expert_status === 'pending') {
                    projects.push(project)
                }
            })
            if (projects.length > 0 && projects.length !== this.state.pendingProjects.length) {
                this.setState({
                    pendingProjects: projects
                })
            }
        }
    }

    renderProjectCards = (projectType) => {
        if(projectType === 'expertProjects') {
            return this.props[projectType].map( (project)=> {
                if(project.expert_status === 'accepted' && project.is_complete !== true) {
                    return (
                        <div key={project.id} className='project-card col-lg-3 col-sm-6'>
                            <ProjectCard project={project} modal={false}/>
                        </div>
                    )
                }
            })
        } else {
            return this.props[projectType].map( (project)=> {
                console.log('map project cards in project card container', project)
                console.log(project.is_complete)
                if(project.is_complete !== true) {
                    return (
                        <div key={project.id} className='project-card col-lg-3 col-sm-6'>
                            <ProjectCard project={project} modal={false}/>
                        </div>
                    )
                }
            })
        }
    }

    render() { 
        return ( 
            <div className='container overflow-auto'>
                <div className='row'>
                        {this.renderProjectCards(this.props.projectType)}
                </div>
                <Modal className='container' show={!!this.state.pendingProjects.length} onHide={() => console.log('hide')}>
                    <Modal.Header>
                        Your Expertise Has Been Requested
                    </Modal.Header>
                    <Modal.Body>
                        <div id='scroll'>
                            {this.state.pendingProjects.length && this.state.pendingProjects.map( (project) => <ProjectCard key={project.id} project={project} modal={true}/>)}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        noviceProjects: state.UserReducer.currentUser.novice_projects,
        expertProjects: state.UserReducer.currentUser.expert_projects,
    }
}
 
export default connect(mapStateToProps)(ProjectCardContainer)