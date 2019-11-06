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
        this.props[this.props.projectType].map( (project) => {
            if(project.expert_status === 'pending') {
                projects.push(project)
            }
        })
        this.setState({pendingProjects: projects})
    }

    componentDidUpdate() {
        console.log('update')
    }

    renderProjectCards = (projectType) => {
        if(projectType === 'expertProjects') {
            return this.props[projectType].map( (project, index)=> {
                if(project.expert_status === 'accepted') {
                    return <ProjectCard key={project.id} project={project} modal={false}/>
                }
            })
        } else {
            return this.props[projectType].map( (project, index)=> <ProjectCard key={project.id} project={project} modal={false}/>)
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
                    <div id='scroll' className='row'>
                        {console.log(this.state.pendingProjects)}
                        {this.state.pendingProjects.length && this.state.pendingProjects.map( (project) => <ProjectCard key={project.id} project={project} modal={true}/>)}
                    </div>
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