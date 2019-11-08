import React from 'react';
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import updateProject from '../actions/updateProject'

const ExpertCard = (props) => {
    const { id, image, name } = props.expert

    function handleClick(projectId, expertId, status) {
        props.updateProject(projectId, expertId, status)
        if(expertId !== null) {
            props.toggleModal('selectExpert')
        }
    }

    function renderCardButton() {
        if(!props.expertMode) {
            return props.method === 'remove' 
            ? <Button onClick={() => handleClick(props.projectId, null, 'none')}>Remove Expert</Button> 
            : <Button onClick={() => handleClick(props.projectId, id, 'pending')}>Select this Expert</Button>
        }
    }
    return ( 
        <>
            <Card className='mt-2'>
                <Card.Img className="img-fluid expert-card-image" src={`${process.env.REACT_APP_API_URL}${image}`} />
                {(props.project.expert_status === 'pending') && <Card.Img id='pending' className="img-fluid expert-card-image" src='./pending.png' />}
                <Card.Body>
                    <Card.Text className='text-center'>{name}</Card.Text>
                        {renderCardButton()}
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
