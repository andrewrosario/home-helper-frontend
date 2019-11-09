import React from 'react';
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import Rating from 'react-rating'
import updateProject from '../actions/updateProject'

const ExpertCard = (props) => {
    const { id, image, name, rating } = props.expert

    function handleClick(projectId, expertId, status) {
        props.updateProject(projectId, expertId, status)
        if(expertId !== null) {
            props.toggleModal('selectExpert')
        }
    }

    function renderCardButton() {
        if(!props.expertMode) {
            return props.method === 'remove' 
            ? <Button onClick={() => handleClick(props.projectId, null, 'none')}>Remove</Button> 
            : <>
                <div className='text-center'>
                    <Rating initialRating={rating} emptySymbol="fa fa-star-o fa-1x" fullSymbol="fa fa-star fa-1x" readonly/>
                </div>
                <div>
                    <Button onClick={() => handleClick(props.projectId, id, 'pending')}>Select this Expert</Button>
                </div>
            </>
        }
    }
    return ( 
        <>
            <Card className='mt-2'>
                <Card.Img className="img-fluid expert-card-image" src={`${process.env.REACT_APP_API_URL}${image}`} />
                {(props.project.expert_status === 'pending') && <Card.Img id='pending' className="img-fluid expert-card-image" src='./pending.png' />}
                <Card.Body>
                    <Card.Text className='mb-0 text-center'>{name}</Card.Text>
                    {!props.done ? renderCardButton() : <Rating 
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={props.getRating}
                    />}
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
