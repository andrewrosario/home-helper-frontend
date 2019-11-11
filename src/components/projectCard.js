import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import updateProject from '../actions/updateProject'
import updateUser from '../actions/updateUser'
import { fetchProject } from '../actions/fetchProject'

const ProjectCard = (props) => {
    const { id, description, title, project_type_id, expert_id } = props.project

    const projectType = () => {
        switch(project_type_id) {
            case 1:
                return 'painting';
            case 2:
                return 'plumbing';
            case 3:
                return 'electrical';
            case 4:
                return 'carpentry';
            case 5: 
                return 'flooring';
            case 6:
                return 'landscaping';
            default:
                return 'painting';
        }
    }

    const handleClick = (expert_id, status) => {
        props.updateProject(id, expert_id, status)
        props.updateUser(props.user.id)
    }

    const handleViewProject = (project) => {
        console.log('handle view in projectCard', project)
        props.fetchProject(project)
    }

    return ( 
        // <div className='project-card col-lg-3 col-sm-6'>
            <Card className='mt-2'>
                <Card.Img className="img-fluid" src={`./${projectType()}.jpg`} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    {props.modal 
                        ?   <>
                                <Button 
                                    variant='success' 
                                    onClick={() => handleClick(expert_id, 'accepted')}>
                                    Accept
                                </Button>
                                <Button 
                                    variant='danger' 
                                    className='float-right' 
                                    onClick={() => handleClick(expert_id, 'rejected')}>
                                    Reject
                                </Button>
                            </> 
                        : <Button onClick={() => handleViewProject(props.project)}>View Project</Button>}
                </Card.Body>
            </Card>
        // </div>
     );
}

function mapStateToProps(state){
    return {user: state.UserReducer.currentUser}
}
 
export default connect(mapStateToProps, { updateProject, updateUser, fetchProject })(ProjectCard);