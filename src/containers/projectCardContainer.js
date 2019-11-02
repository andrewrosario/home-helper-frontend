import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectCard from '../components/projectCard'

class ProjectCardContainer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='container overflow-auto'>
                <div className='row'>
                    {this.props.projects.map( (project) => <ProjectCard project={project} />)}
                </div>
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        projects: state.UserReducer.currentUser.user.novice_projects
    }
}
 
export default connect(mapStateToProps)(ProjectCardContainer)