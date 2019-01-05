import * as mockData from './mock/mockData';
import store from '../store/store';
import * as actions from '../actions/ajaxActions';
import config from './config';
import * as ajaxRequest from '../common/ajax/ajaxRequest';

const taskUrl = `${config.apiURL}/task`;

export function getTask() {
    store.dispatch(actions.beginCall());
    return new Promise((resolve, reject) => {
        // ajaxRequest.get(taskUrl, {
        //     success: (task) => {
        //         resolve(task);
        //     },
        //     error: (error) => {
        //         reject(error);
        //     }
        // });


        setTimeout(() => {
            store.dispatch(actions.endCall());
            resolve(Object.assign({}, mockData.task));
        }, config.mockApiDelay);
    });
}