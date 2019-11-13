import React, { Component } from 'react'
import ExpertCard from '../components/expertCard'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class DetailsContainer extends Component {
    constructor(props) {
        super(props)
        const totalTime = props.project.tasks.reduce( (accum, current) => {
            console.log('accum', 'current', accum, current.time_required)
            return accum + current.time_required
        }, 0)
        const completedTime = props.project.tasks.reduce( (accum, current, index, array) => {
            if(array[index].is_complete) {
                console.log('accum', 'current', accum, current.time_required)
                return accum + current.time_required
            }
        }, 0)
        this.state = {
            percentage: completedTime/totalTime
        }
    }
    render() {
        console.log('details container', this.state)
        const { title, before_photos, description, expert, id } = this.props.project
        return ( 
            <div id='details' className='col-12 border-bottom border-dark container2'>
                <h3>{title} Details</h3>
                <CircularProgressbar value={this.state.percentage} text={`${this.state.percentage}%`} />;
                {!!before_photos.length && <h5>Before Photos</h5>}
                <div className='row'>
                    {before_photos && before_photos.map( (photo, index) => <img key={index} 
                                                                                className='col-4' alt='before' 
                                                                                src={`${process.env.REACT_APP_API_URL}${photo}`}>
                                                                            </img>)}
                </div>
                <h5 className='mt-2'>Project Description</h5>
                {description}
                {this.props.expert ? <h5 className='mt-2'>Your Novice</h5> : <h5 className='mt-2'>Your Expert</h5>}
                {!this.props.expert && (expert ? <ExpertCard toggleModal={this.props.toggleModal} expert={expert} projectId={id} method={'remove'}/> : <Button onClick={() => this.props.toggleModal('selectExpert')}>Find an Expert</Button>)}
                {this.props.expert && <ExpertCard expertMode={this.props.expert} expert={this.props.project.novice} projectId={id} method={'remove'}/>}
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        project: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps)(DetailsContainer)