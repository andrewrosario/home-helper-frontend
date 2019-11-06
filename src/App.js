import React, { Component } from 'react';
import Welcome from './components/welcome'
import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import history from './history';
import Dashboard from './containers/dashboard';
import updateUser from './actions/updateUser'

class App extends Component {
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
    return {currentUser: state.UserReducer.currentUser.user}
  }
}

export default connect(mapStateToProps, { updateUser })(App);
