import config from './config';
import store from '../store/store';
import * as actions from '../actions/ajaxActions';
import * as ajaxRequest from '../common/ajax/ajaxRequest';
import $ from 'jquery';

const getProvidersUrl = `${config.apiURL}/account/externalLogins?returnUrl=${config.returnUrl}`;
const registerUserUrl = `${config.apiURL}/account/register`;
const registerExternalUserUrl = `${config.apiURL}/account/registerexternal`;
const getUserInfoUrl = `${config.apiURL}/account/userinfo`;
const getTokenUrl = `${config.apiURL}/token`;

export default class UserApi {
    //==============| Get all login providers |==============
    static getAllLoginProviders() {
        store.dispatch(actions.beginCall());
        return new Promise((resolve, reject) => {
            $.ajax(getProvidersUrl, {
                success: (data) => {
                    store.dispatch(actions.endCall());
                    resolve(data);
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }

    //==============| Register user |==============
    static registerUser(user) {
        store.dispatch(actions.beginCall());
        return new Promise((resolve, reject) => {
            $.ajax(registerUserUrl, {
                data: user,
                method: 'POST',
                success: (data) => {
                    store.dispatch(actions.endCall());

                    this.getToken(user.email).then((data) => {
                        resolve(data);
                    });
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }

    static registerExternalUser(user, tokenType, accessToken) {
        store.dispatch(actions.beginCall());
        return new Promise((resolve, reject) => {
            $.ajax(registerExternalUserUrl, {
                data: user,
                headers: { 'Authorization': `${tokenType} ${accessToken}` },
                method: 'POST',
                success: (data) => {
                    store.dispatch(actions.endCall());

                    this.getToken(user.email).then((data) => {
                        resolve(data);
                    });
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }

    //==============| Get external user information |==============
    static getExternalUserInfo(tokenType, accessToken) {
        store.dispatch(actions.beginCall());
        return new Promise((resolve, reject) => {

            $.ajax(getUserInfoUrl, {
                headers: { 'Authorization': `${tokenType} ${accessToken}` },
                method: 'GET',
                success: (data) => {
                    store.dispatch(actions.endCall());
                    resolve(data);
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }

    //==============| Get user information |==============
    static getUserInfo() {
        store.dispatch(actions.beginCall());
        return new Promise((resolve, reject) => {

            ajaxRequest.get(getUserInfoUrl, {
                success: (data) => {
                    store.dispatch(actions.endCall());
                    resolve(data);
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }

    //==============| Get user token |==============
    static getToken(email) {
        store.dispatch(actions.beginCall());

        return new Promise((resolve, reject) => {
            $.ajax(getTokenUrl, {
                method: 'POST',
                data: {
                    grant_type: 'password',
                    username: email,
                    password: '123456'
                },
                success: (data) => {
                    store.dispatch(actions.endCall());
                    resolve(data);
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }

    static getAdminToken(user) {
        store.dispatch(actions.beginCall());

        return new Promise((resolve, reject) => {
            $.ajax(getTokenUrl, {
                method: 'POST',
                contentType: "application/x-www-form-urlencoded",
                data: {
                    grant_type: 'password',
                    username: user.username,
                    password: user.password
                },
                success: (data) => {
                    store.dispatch(actions.endCall());
                    resolve(data);
                },
                error: (error) => {
                    store.dispatch(actions.endCall());
                    reject(error);
                }
            });
        });
    }
}