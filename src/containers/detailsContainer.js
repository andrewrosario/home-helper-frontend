import React, { Component } from 'react';

class DetailsContainer extends Component {
    state = {  }
    render() { 
        const { title, before_photos, description } = this.props.project
        return ( 
            <div id='details' className='col-12 border-bottom border-dark container2'>
                <h3>{title} Details</h3>
                {before_photos.length && <h5>Before Photos</h5>}
                <div className='row'>
                    {before_photos.map( (photo) => <img className='col-4' alt='before' src={`${process.env.REACT_APP_API_URL}${photo}`}></img>)}
                </div>
                <h5 className='mt-2'>Project Description</h5>
                {description}
                <h5 className='mt-2'>Your Expert</h5>
            </div>
         );
    }
}
 
export default DetailsContainer;