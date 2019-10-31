import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App';
import { loadState, saveState } from './localStorage'

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk)
));

store.subscribe(() => {
  saveState({
    LoginReducer: store.getState().LoginReducer
  });
});

// Higher order component design pattern
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
