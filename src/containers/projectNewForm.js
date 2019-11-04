import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createNewProject } from '../actions/createNewProject'
import NewProject from './newProject'
import AddBeforePhotos from '../components/addBeforePhotos'
import SelectExpert from '../components/selectExpert'

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

    continue = (e, inc) => {
        e.preventDefault()
        const { step } = this.state
        this.setState({
            step : step + inc
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
        this.props.createNewProject(this.state.project)
        this.props.closeProjectModal()
    }

    render() { 
        const {step} = this.state;
        switch(step) {
            case 1:
                return <NewProject  
                        continue={this.continue} 
                        handleChange = {this.handleChange}
                        />
            case 2:
                return <AddBeforePhotos 
                        handleAddFiles = {this.handleAddFiles}
                        continue={this.continue}
                        />
            case 3:
                return <SelectExpert 
                        projectTypeId = {this.state.project.type}
                        submitHandler = {this.submitHandler}
                        />
            default:
                return <NewProject  
                        handleChange = {this.handleChange}
                        continue={this.continue}
                        method={'add'}
                        />
            }
    }
}

function mapStateToProps(state){
    return {user: state.UserReducer.currentUser.user}
}
 
export default connect(mapStateToProps, { createNewProject } )(ProjectNewForm)