import React, { Component } from 'react';
import Welcome from './components/welcome'
import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import history from './history';
import Dashboard from './containers/dashboard';
import updateUser from './actions/updateUser'
import { openSocket } from './actions/openSocket'
import io from 'socket.io-client';
import { dispatchMaterial } from './actions/dispatchMaterial'
import { dispatchMessage } from './actions/dispatchMessage'
import { dispatchTask } from './actions/dispatchTask'

class App extends Component {
  componentDidMount() {
    const socket = io('https://diyhelper.herokuapp.com/');
    socket.on('connect', () => {})
    socket.on("receiveUpdateMaterials", materials => {
        this.props.dispatchMaterial(materials)
    })
    socket.on("receiveMessage", message => {
        this.props.dispatchMessage(message)
    })
    socket.on("receiveUpdateTask", (tasks) => {
        this.props.dispatchTask(tasks)
    })
    this.props.openSocket(socket)
  }

  componentDidUpdate() {
    if(!this.props.socket) {
      const socket = io('https://diyhelper.herokuapp.com/');
      socket.on('connect', () => {})
      socket.on("receiveUpdateMaterials", materials => {
          this.props.dispatchMaterial(materials)
      })
      socket.on("receiveMessage", message => {
          this.props.dispatchMessage(message)
      })
      socket.on("receiveUpdateTask", (tasks) => {
          this.props.dispatchTask(tasks)
          console.log('client receive tasks')
      })
      this.props.openSocket(socket)
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            {this.props.currentUser ? history.push('/novice-dashboard') : <Route exact path='/' component={Welcome}/> }
            <Route exact path='/novice-dashboard' component={Dashboard}></Route>
            <Route exact path='/expert-dashboard'>
              <Dashboard expert={true}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  if(state.UserReducer.currentUser) {
    return {
      currentUser: state.UserReducer.currentUser.user,
      socket: state.SocketReducer.socket
    }
  }
}

export default connect(mapStateToProps, { updateUser, openSocket, dispatchMaterial, dispatchMessage, dispatchTask })(App);
