import React from 'react';
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import updateProject from '../actions/updateProject'

const ExpertCard = (props) => {
    const { id, image, name } = props.expert

    function handleClick(projectId, expertId) {
        props.updateProject(projectId, expertId, 'pending')
        props.toggleModal('selectExpert')
    }
    
    return ( 
        <>
            <Card className='mt-2'>
                <Card.Img className="img-fluid expert-card-image" src={`${process.env.REACT_APP_API_URL}${image}`} />
                {console.log(props.project)}
                {(props.project.expert_status === 'pending') && <Card.Img id='pending' className="img-fluid expert-card-image" src='./pending.png' />}
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text></Card.Text>
                    {props.method === 'remove' ? <Button onClick={() => props.updateProject(props.projectId)}>Remove this Expert</Button> : <Button onClick={() => handleClick(props.projectId, id)}>Select this Expert</Button>}
                </Card.Body>
            </Card>
        </>
     );
}

function mapStateToProps(state){
    return {
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { updateProject })(ExpertCard)
