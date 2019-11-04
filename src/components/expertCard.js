import React from 'react';
import { connect } from 'react-redux'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact'
import updateProject from '../actions/updateProject'


const ExpertCard = (props) => {
    const { id, image, name } = props.expert
    return ( 
        <MDBCol className='expert-card'>
            <MDBCard className='mt-2'>
                <MDBCardImage className="img-fluid expert-card-image" src={`${process.env.REACT_APP_API_URL}${image}`} waves />
                <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBCardText>
                    {console.log(props)}
                </MDBCardText>
                    {props.method == 'remove' ? <MDBBtn onClick={() => props.updateProject(props.projectId)}>Remove this Expert</MDBBtn> : <MDBBtn onClick={() => props.updateProject(props.projectId, id)}>Select this Expert</MDBBtn>}
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
     );
}
 
export default connect(null, { updateProject })(ExpertCard)