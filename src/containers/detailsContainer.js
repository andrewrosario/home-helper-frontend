import React, { Component } from 'react'
import ExpertCard from '../components/expertCard'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class DetailsContainer extends Component {
    calculateProgress = (project) => {
        const totalTime = project.tasks.reduce( (accum, current) => {
            console.log('Total Time: accum', 'current', accum, current.time_required)
            return accum + current.time_required
        }, 0)
        const completedTime = project.tasks.reduce( (accum, current, index, array) => {
            if(array[index].is_complete) {
                console.log('Completed TIme: accum', 'current', accum, current.time_required)
                return accum + current.time_required
            } else {
                return accum
            }
        }, 0)
        console.log('calculateprogress return', completedTime, totalTime)

        totalTime > 0 ? Math.round(completedTime/totalTime*100) : 0
    }

    constructor(props) {
        super(props)
        this.state = {
            percentage: this.calculateProgress(props.project)
        }
    }

    componentDidUpdate(prevProps) {
        console.log('details did update', prevProps, this.props)
        if(prevProps.completeCount !== this.props.completeCount) {
            console.log('details did update if', this.props.project)
            this.setState({
                percentage: this.calculateProgress(this.props.project)
            })
        }
        if(prevProps.project.id !== this.props.project.id) {
            console.log('Update if project changes props', this.props)
            this.setState({
                percentage: this.calculateProgress(this.props.project)
            })
        }
    }

    render() {
        console.log('details container', this.state)
        const { title, before_photos, description, expert, id } = this.props.project
        return ( 
            <div id='details' className='col-12 border-bottom border-dark container2'>
                <h3>{title} Details</h3>
                <h5>Progress</h5>
                <CircularProgressbar value={this.state.percentage} text={`${this.state.percentage}%`} strokeWidth='20'/>
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
        project: state.ProjectReducer.currentProject,
        completeCount: state.ProjectReducer.completeCount
    }
}
 
export default connect(mapStateToProps)(DetailsContainer)