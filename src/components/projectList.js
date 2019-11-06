import React from 'react';

const ProjectList = (props) => {
    return ( 
        <p className='menu-item' onClick={() => props.handleProjectClick(props.project)}>{props.project.title}</p>
     );
}
 
export default ProjectList;