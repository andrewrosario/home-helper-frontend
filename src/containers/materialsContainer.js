import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import MaterialListItem from '../components/materialListItem'
import MaterialNewForm from '../components/materialNewForm'
import MaterialEditForm from '../components/materialEditForm'
import { connect } from 'react-redux'
import { fetchProject } from '../actions/fetchProject'
import CommentNewForm from '../components/commentNewForm'
import { newComment } from '../actions/newComment'
import DisplayComments from '../components/displayComments'

class MaterialsContainer extends Component {
    state = { 
        showNewModal: false,
        showEditModal: false,
        showCommentModal: false,
        showDisplayModal: false,
        focus: null
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
        .then(materials => {
            console.log('socket emit materials container', data)
            this.props.socket.emit('sendUpdateMaterials', materials, this.props.project.id)
            this.setState({
                ...this.state,
                showNewModal: false,
                showEditModal: false,
                showDiplayModal: false,
                focus: null
            })
        })
    }

    handleDoneNewClick = (materialsObj) => {
        this.fetchPostPatch(materialsObj, 'POST', 'materials')
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
            .then(materials => {
                this.props.socket.emit('sendUpdateMaterials', materials, this.props.project.id)
                this.setState({
                    ...this.state,
                    showNewModal: false,
                    showEditModal: false,
                    focus: null
                })
            })
        }
    }

    materialsSocketUpdate = (materials) => {
        this.props.socket.emit('sendUpdateMaterials', materials, this.props.project.id)
    }

    handleClick = (material, type) => {
        this.setState({
            ...this.state,
            focus: material,
            [`show${type}Modal`]: !this.state[`show${type}Modal`]
        })
    }

    handleDoneCommentClick = (text) => {
        const data = {text, commentOn: this.state.focus.id, userId: this.props.user.id}
        this.props.newComment('material', data, this.materialSocketUpdate)
        this.setState({
            ...this.state,
            focus: null,
            showCommentModal: !this.state.showCommentModal
        })
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
                        <th>Comment</th>
                        <th width='1%'>Edit</th>
                    </tr>
                </thead>
                {this.props.materials && this.props.materials.map( material => <MaterialListItem  
                                                                                    key={material.id} 
                                                                                    material={material} 
                                                                                    handleClick={this.handleClick}
                                                                                />)}
            </Table>
            {this.state.showEditModal &&    <MaterialEditForm 
                                                material={this.state.focus} 
                                                show={this.state.showEditModal} 
                                                handleDoneEditClick={this.handleDoneEditClick} 
                                                handleClick={this.handleClick}
                                                handleDeleteClick={this.handleDeleteClick}
                                            />}
            {this.state.showNewModal &&     <MaterialNewForm 
                                                show={this.state.showNewModal} 
                                                handleDoneNewClick={this.handleDoneNewClick} 
                                                handleClick={this.handleClick}
                                            />}
            {this.state.focus &&    <CommentNewForm 
                                        show={this.state.showCommentModal} 
                                        handleDoneCommentClick={this.handleDoneCommentClick} 
                                        handleClick={this.handleClick}
                                    />}
            {this.state.focus &&    <DisplayComments 
                                        task={this.state.focus}
                                        show={this.state.showDisplayModal} 
                                        handleClick={this.handleClick}
                                    />}  
            <button id='new-material' className='btn-primary' onClick={() => this.handleClick(null, 'New')}>Add a Material</button>
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        project: state.ProjectReducer.currentProject,
        materials: state.ProjectReducer.currentProject.materials,
        user: state.UserReducer.currentUser,
        socket: state.UserReducer.socket
    }
}
 
export default connect(mapStateToProps, { fetchProject, newComment })(MaterialsContainer)