import React, { Component } from 'react'
import ExpertCard from '../components/expertCard'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

class DetailsContainer extends Component {
    state = {  }

    render() {
        const { title, before_photos, description, expert, id } = this.props.currentProject
        return ( 
            <div id='details' className='col-12 border-bottom border-dark container2'>
                <h3>{title} Details</h3>
                {before_photos && <h5>Before Photos</h5>}
                <div className='row'>
                    {before_photos && before_photos.map( (photo, index) => <img key={index} 
                                                                                className='col-4' alt='before' 
                                                                                src={`${process.env.REACT_APP_API_URL}${photo}`}>
                                                                            </img>)}
                </div>
                <h5 className='mt-2'>Project Description</h5>
                {description}
                <h5 className='mt-2'>Your Expert</h5>
                {expert ? <ExpertCard expert={expert} projectId={id} method={'remove'}/> : <Button onClick={() => this.props.toggleModal('selectExpert')}>Find an Expert</Button>}

            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        currentProject: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps)(DetailsContainer)