import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import MaterialListItem from '../components/materialListItem'
import MaterialNewForm from '../components/materialNewForm'
import MaterialEditForm from '../components/materialEditForm'

class MaterialsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            project_id: props.projectId,
            materials: props.materials,
            showNewModal: false,
            showEditModal: false,
            focus: null
         }
    }

    componentDidUpdate() {
        if(this.props.projectId !== this.state.project_id) {
            this.setState({
                ...this.state,
                materials: this.props.materials,
                project_id: this.props.projectId,
                showNewModal: false,
                showEditModal: false,
                focus: null,
            })
        }
    }

    fetchPostPatch = (name, amount, unit, link, cost, method, path) => {
        const projectId = this.state.project_id
        fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                material: {
                    name: name,
                    amount: amount,
                    amount_unit: unit,
                    link: link,
                    cost: cost,
                    project_id: projectId
                }
            })
        })
        .then(resp => resp.json())
        .then(materials => {
            this.setState({
                ...this.state,
                materials: materials,
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

    handleDoneNewClick = (name, amount, unit, link, cost) => {
        this.fetchPostPatch(name, amount, unit, link, cost, 'POST', 'materials')
    }

    handleEditClick = (material) => {
        this.setState({
            ...this.state,
            focus: material,
            showEditModal: !this.state.showEditModal
        })
    }

    handleDoneEditTaskClick = (text, time) => {
        this.fetchPostPatchTask(text, time, 'PATCH', `tasks/${this.state.editTask.id}`)
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
            .then(materials => {
                this.setState({
                    ...this.state,
                    materials: materials,
                    showNewModal: false,
                    showEditModal: false,
                    focus: null
                })
            })
          }
    }


    render() { 
        return ( 
            <div id='materials' className='col-8'>
            <h1>Materials</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Cost</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                {this.state.materials && this.state.materials.map( material => <MaterialListItem  
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
 
export default MaterialsContainer;