import { combineReducers } from 'redux';

import task from './taskReducer';
import pendingAjaxCalls from './pendingAjaxCallsReducer';
import providers from './providersReducer';
import user from './userReducer';

import results from './resultsReducer';

const appReducer = combineReducers({
    task,
    pendingAjaxCalls,
    providers,
    user,
    results
});

export default appReducer;