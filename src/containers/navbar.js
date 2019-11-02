import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { logout } from '../actions/logout'
import { connect } from 'react-redux'

const NavBar = (props) => {
  console.log(props)
  return ( 
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <p>Projects</p>
      {props.projects.map( (project, index)=> <p key={index} className='menu-item' onClick={() => props.handleProjectClick(project.id)}>{project.title}</p>)}
      <br></br>
      <p className='menu-item' onClick={props.toggleCreateProject}>Create New Project</p>
      <p className='menu-item' onClick={props.logout}>Logout</p>
    </Menu>
   );
}

function mapStateToProps(state) {
  return {
      projects: state.UserReducer.currentUser.user.novice_projects
  }
}

export default connect(mapStateToProps, { logout }) (NavBar);
