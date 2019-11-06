import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact'

const ProjectCard = (props) => {
    const { description, title, project_type_id } = props.project

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
    
    return ( 
        <div className='project-card col-lg-3 col-sm-6'>
            <MDBCol>
                <MDBCard className='mt-2'>
                    <MDBCardImage className="img-fluid" src={`./${projectType()}.jpg`} waves />
                    <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                        {description}
                    </MDBCardText>
                    <MDBBtn href="#">View Project</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </div>
     );
}
 
export default ProjectCard;