import config from './config';
import * as mockData from './mock/mockData';
import store from '../store/store';
import * as actions from '../actions/ajaxActions';
import * as ajaxRequest from '../common/ajax/ajaxRequest';

const resultsUrl = `${config.apiURL}/game/results`;
const getResultsUrl = `${config.apiURL}/admin/ranking`;
const deleteResultUrl = `${config.apiURL}/admin/deleteresult`

export function getAllResults() {
    store.dispatch(actions.beginCall());
    return new Promise((resolve, reject) => {
        ajaxRequest.get(getResultsUrl, {
            success: (results) => {
                store.dispatch(actions.endCall());
                resolve(results);
            },
            error: (error) => {
                store.dispatch(actions.endCall());
                reject(error);
            }
        });

        // setTimeout(() => {
        //     store.dispatch(actions.endCall());

        //     resolve(Object.assign([], mockData.results));
        // }, config.mockApiDelay);
    });
}

export function sendResult(result) {
    store.dispatch(actions.beginCall());
    return new Promise((resolve, reject) => {
        ajaxRequest.post(resultsUrl, {
            data: result,
            success: (data) => {
                store.dispatch(actions.endCall());
                resolve(data);
            },
            error: (error) => {
                store.dispatch(actions.endCall());
                reject(error);
            }
        });


        // setTimeout(() => {
        //     store.dispatch(actions.endCall());
        //     resolve({
        //         score: 15,
        //         hasWon: true
        //     });
        // }, config.mockApiDelay);
    });
}

export function deleteResults(results) {
    store.dispatch(actions.beginCall());

    return new Promise((resolve, reject) => {
        ajaxRequest.post(deleteResultUrl, {
            data: JSON.stringify(results),
            dataType: "json",        
            contentType: 'application/json; charset=utf-8',
            success: () => {
                store.dispatch(actions.endCall());
                resolve();
            },
            error: (error) => {
                store.dispatch(actions.endCall());
                reject(error);
            }
        });

        // setTimeout(() => {
        //     store.dispatch(actions.endCall());

        //     resolve();
        // }, config.mockApiDelay);
    });
}