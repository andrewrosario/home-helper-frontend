import React, { Component } from 'react'
import ExpertCard from '../components/expertCard'

class DetailsContainer extends Component {
    state = {  }

    removeExpert = () => {
        const id = this.props.project.id
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                expert_id: 'nil'
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    render() {
        const { title, before_photos, description, expert } = this.props.project
        return ( 
            <div id='details' className='col-12 border-bottom border-dark container2'>
                {console.log(this.props.project)}
                <h3>{title} Details</h3>
                {before_photos.length && <h5>Before Photos</h5>}
                <div className='row'>
                    {before_photos.map( (photo, index) => <img key={index} className='col-4' alt='before' src={`${process.env.REACT_APP_API_URL}${photo}`}></img>)}
                </div>
                <h5 className='mt-2'>Project Description</h5>
                {description}
                <h5 className='mt-2'>Your Expert</h5>
                {expert && <ExpertCard expert={expert} removeExpert={this.removeExpert}/>}
            </div>
         );
    }
}
 
export default DetailsContainer;