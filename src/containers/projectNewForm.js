import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createNewProject } from '../actions/createNewProject'
import NewProject from './newProject'
import AddBeforePhotos from '../components/addBeforePhotos'

class ProjectNewForm extends Component {
    state = { 
        step: 1,
        project: {
            user: this.props.user.id,
            name: '',
            description: '',
            type: '',
            before_photos: []
        }
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ 
            ...this.state,
            project: {
                ...this.state.project,
                [input] : event.target.value 
            }
        })
    }

    handleAddFiles = event => {
        this.setState({ 
            ...this.state,
            project: {
                ...this.state.project,
                before_photos: event.target.files 
            }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.createNewProject(this.state.project)
        this.props.closeProjectModal()
    }

    render() { 
        const {step} = this.state;
        switch(step) {
            case 1:
                return <NewProject  
                        nextStep={this.nextStep} 
                        handleChange = {this.handleChange}
                        submitHandler = {this.submitHandler}
                        />
            case 2:
                return <AddBeforePhotos 
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleAddFiles = {this.handleAddFiles}
                        submitHandler = {this.submitHandler}
                        />
            // case 3:
            //     return <Confirmation 
            //             nextStep={this.nextStep}
            //             prevStep={this.prevStep}
            //             />
            // case 4:
            //     return <Success />
            }
    }
}

function mapStateToProps(state){
    return {user: state.UserReducer.currentUser.user}
}
 
export default connect(mapStateToProps, { createNewProject } )(ProjectNewForm)