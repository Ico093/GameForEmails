import * as resultsApi from '../api/resultsApi';
import * as actions from './constants/actionConstants';

export function getResultsSuccess(results) {
    return { type: actions.LOAD_RESULTS_SUCCESS, results: results };
}

export function deleteResultsSuccess(results) {
    return { type: actions.DELETE_RESULTS_SUCCESS, results: results };
}

export function getResults() {
    return (dispatch) => {
        return resultsApi.getAllResults().then((results) => {
            dispatch(getResultsSuccess(results));
        }).catch(error => {
            throw (error);
        })
    }
}

export function deleteResults(results) {
    return (dispatch) => {
        return resultsApi.deleteResults(results).then(() => {
            dispatch(deleteResultsSuccess(results));
        }).catch(error => {
            throw (error);
        })
    }
}