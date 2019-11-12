import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import App from './App';
import { loadState, saveState } from './localStorage'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };
 
const pReducer = persistReducer(persistConfig, rootReducer);

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(pReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk)
));

const persistor = persistStore(store);

console.log('persisted state', persistedState)
console.log('store', store)

store.subscribe(() => {
  saveState({
    UserReducer: store.getState().UserReducer
  });
});

// Higher order component design pattern
ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<App />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
