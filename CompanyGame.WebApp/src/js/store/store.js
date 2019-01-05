import { createStore, applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk'
import appReducer from '../reducers/appReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(appReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;