import React, { Component } from 'react';
import Welcome from './components/welcome'
import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import history from './history';
import NoviceDashboard from './containers/dashboard';
import updateUser from './actions/updateUser'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            {this.props.currentUser ? history.push('/novice-dashboard') : <Route exact path='/' component={Welcome}/> }
            <Route exact path='/novice-dashboard' component={NoviceDashboard}>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  if(state.LoginReducer.currentUser) {
    return {currentUser: state.LoginReducer.currentUser.user}
  }
}

export default connect(mapStateToProps, { updateUser })(App);
