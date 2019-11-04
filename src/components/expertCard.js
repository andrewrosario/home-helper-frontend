import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact'


const ExpertCard = (props) => {
    const { image, name } = props.expert
    return ( 
        <MDBCol className='expert-card'>
            <MDBCard className='mt-2'>
                <MDBCardImage className="img-fluid expert-card-image" src={`${process.env.REACT_APP_API_URL}${image}`} waves />
                <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBCardText>
                    
                </MDBCardText>
                    <MDBBtn onClick={props.removeExpert}>Remove this Expert</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
     );
}
 
export default ExpertCard;