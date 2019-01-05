import * as tasksApi from '../api/tasksApi';
import * as resultsApi from '../api/resultsApi';
import * as actions from './constants/actionConstants';
import * as userActions from './userActions';

function loadTaskSuccess(task) {
    return { type: actions.LOAD_QUESTIONS_AND_ANSWERS_SUCCESS, task };
}

export function clearTask() {
    return { type: actions.CLEAR_TASK };
}

export function loadTask() {
    return function (dispatch) {
        return tasksApi.getTask().then(task => {
            dispatch(loadTaskSuccess(task));
        }).catch(error => {
            throw (error);
        });
    }
}

export function sendResult(result) {
    return (dispatch) => {
        return resultsApi.sendResult(result).then((data) => {
            return data;
        }).catch(error => {
            throw (error);
        })
    }
}

export function userFinishedPlaying() {
    return { type: actions.USER_FINISHED_PLAYING };
}