import React, { Component } from 'react'
import { Modal} from 'react-bootstrap'
import ExpertCard from './expertCard'
import { connect } from 'react-redux'

class SelectExpert extends Component {
    state = {
        experts: []
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/experts/${this.props.projectTypeId}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                experts: data
            })
        })
    }

    render() { 
        return ( 
            <Modal.Body>
                <div id='scroll'>
                    {this.state.experts.map( (expert, index) => <ExpertCard key={index} 
                                                                                expert={expert} 
                                                                                projectTypeId={this.props.projectTypeId} 
                                                                                projectId={this.props.projectId}
                                                                                method={'add'}
                                                                                toggleModal={this.props.toggleModal}
                                                                                className='select-expert'
                                                                    />)}
                </div>
            </Modal.Body>
         );
    }
}

function mapStateToProps(state){
    return {
        currentProject: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps)(SelectExpert)