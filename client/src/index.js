import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './sagas'

import Dashboard from './components/Dashboard'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)
const action = type => store.dispatch({type})

ReactDOM.render(
  <Provider store={store}>
  <Dashboard
    onFetchChannels={() => action('FETCH_CHANNELS')} 
    onFetchMessages={() => action('FETCH_MESSAGES')}  
  />
  </Provider>,
  document.getElementById('root')
)