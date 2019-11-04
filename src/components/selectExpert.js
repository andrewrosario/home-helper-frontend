import React, { Component } from 'react'
import { Modal} from 'react-bootstrap'
import ExpertCard from './expertCard'
import { connect } from 'react-redux'
import updateProject from '../actions/updateProject'

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
                    {this.state.experts.map( (expert, index) => <ExpertCard key={index} 
                                                                            expert={expert} 
                                                                            projectTypeId={this.props.projectTypeId} 
                                                                            projectId={this.props.projectId}
                                                                            method={'add'}
                                                                            toggleModal={this.props.toggleModal}
                                                                />)}
            </Modal.Body>
         );
    }
}

function mapStateToProps(state){
    return {
        currentProject: state.ProjectReducer.currentProject
    }
}
 
export default connect(mapStateToProps, { updateProject })(SelectExpert)