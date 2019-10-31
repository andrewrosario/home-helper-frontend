import React, { Component } from 'react';
import Welcome from './components/welcome'
import './App.css';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import history from './history';
import NoviceDashboard from './containers/dashboard';


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
  return { currentUser: state.LoginReducer.currentUser.user }
}

export default connect(mapStateToProps)(App);
