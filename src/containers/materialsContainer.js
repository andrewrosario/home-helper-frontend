import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import MaterialListItem from '../components/materialListItem'
import MaterialNewForm from '../components/materialNewForm'
import MaterialEditForm from '../components/materialEditForm'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client"
import { fetchProject } from '../actions/fetchProject'

const endpoint = "http://127.0.0.1:8000"
const socket = socketIOClient(endpoint)
// process.env.REACT_APP_API_URL

class MaterialsContainer extends Component {
    state = { 
        showNewModal: false,
        showEditModal: false,
        focus: null
    }

    componentDidMount() {
        socket.on('connect', () => {})
        socket.on("receiveUpdateMaterials", data => {
            this.props.fetchProject(this.props.project)
        })
        socket.emit('room', `materials_id_${this.props.project.id}`)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.project.id !== this.props.project.id) {
            this.setState({
                showNewModal: false,
                showEditModal: false,
                focus: null,
            })
        }
    }

    fetchPostPatch = (materialsObj, method, path) => {
        const projectId = this.props.project.id
        fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                material: {
                    ...materialsObj,
                    project_id: projectId
                }
            })
        })
        .then(resp => resp.json())
        .then( () => {
            socket.emit('sendUpdateMaterials', this.props.project.id)
            this.setState({
                ...this.state,
                showNewModal: false,
                showEditModal: false,
                focus: null
            })
        })
    }

    handleNewClick = () => {
        this.setState({
            ...this.state,
            showNewModal: !this.state.showNewModal
        })
    }

    handleDoneNewClick = (materialsObj) => {
        this.fetchPostPatch(materialsObj, 'POST', 'materials')
    }

    handleEditClick = (material) => {
        this.setState({
            ...this.state,
            focus: material,
            showEditModal: !this.state.showEditModal
        })
    }

    handleDoneEditClick = (materialsObj) => {
        this.fetchPostPatch(materialsObj, 'PATCH', `materials/${this.state.focus.id}`)
    }

    handleDeleteClick = () => {
        if (window.confirm("Do you really want to delete this material?")) { 
            fetch(`${process.env.REACT_APP_API_URL}/materials/${this.state.focus.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("jwt")
                }
            })
            .then(resp => resp.json())
            .then( () => {
                socket.emit('sendUpdateMaterials', this.props.project.id)
                this.setState({
                    ...this.state,
                    showNewModal: false,
                    showEditModal: false,
                    focus: null
                })
            })
        }
    }

    render() { 
        return ( 
            <div id='materials' className='col-12 mb-2 pb-2'>
            <h3>Materials</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th width='2%'>Cost</th>
                        <th width='2%'>Edit</th>
                    </tr>
                </thead>
                {this.props.materials && this.props.materials.map( material => <MaterialListItem  
                                                                                    key={material.id} 
                                                                                    material={material} 
                                                                                    handleEditClick={this.handleEditClick}
                                                                                />)}
            </Table>
            {this.state.showEditModal &&    <MaterialEditForm 
                                                material={this.state.focus} 
                                                show={this.state.showEditModal} 
                                                handleDoneEditClick={this.handleDoneEditClick} 
                                                handleEditClick={this.handleEditClick}
                                                handleDeleteClick={this.handleDeleteClick}
                                            />}
            {this.state.showNewModal &&     <MaterialNewForm 
                                                show={this.state.showNewModal} 
                                                handleDoneNewClick={this.handleDoneNewClick} 
                                                handleNewClick={this.handleNewClick}
                                            />}
            <button id='new-material' onClick={this.handleNewClick}>Add a Material</button>
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        project: state.ProjectReducer.currentProject,
        materials: state.ProjectReducer.currentProject.materials
    }
}
 
export default connect(mapStateToProps, { fetchProject })(MaterialsContainer)