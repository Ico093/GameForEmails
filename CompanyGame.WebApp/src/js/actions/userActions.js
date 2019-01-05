import * as actions from './constants/actionConstants';
import userApi from '../api/userApi';


function getAllLoginProvidersSuccess(providers) {
    return { type: actions.LOAD_PROVIDERS_SUCCESS, providers: providers };
}

function getUserInfoSuccess(userInfo) {
    return { type: actions.LOAD_USER_INFO_SUCCESS, userInfo: userInfo };
}

function registerUserSuccess(userData) {
    return { type: actions.REGISTER_USER_SUCCESS, userData: userData };
}

export function getAllLoginProviders() {
    return (dispatch) => {
        return userApi.getAllLoginProviders().then((providers) => {
            dispatch(getAllLoginProvidersSuccess(providers));
        });
    }
}

export function getUserInfo() {
    return (dispatch) => {
        return userApi.getUserInfo().then((userInfo) => {
            dispatch(getUserInfoSuccess(userInfo));
        })
    }
}

export function getExternalUserInfo(tokenType, accessToken) {
    return (dispatch) => {
        return userApi.getExternalUserInfo(tokenType, accessToken).then((userInfo) => {
            return userInfo;
        });
    }
}

export function registerUser(user) {
    return (dispatch) => {
        return userApi.registerUser(user).then((data) => {
            dispatch(registerUserSuccess(data));
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
}

export function registerExternalUser(user, tokenType, accessToken) {
    return (dispatch) => {
        return userApi.registerExternalUser(user, tokenType, accessToken).then((data) => {
            dispatch(registerUserSuccess(data));
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
}

export function loginExternalUser(tokenType, accessToken) {
    return (dispatch) => {
        dispatch(registerUserSuccess({
            token_type: tokenType,
            access_token: accessToken
        }));
    }
}

export function loginAdminUser(user) {
    return (dispatch) => {
        return userApi.getAdminToken(user).then((data) => {
            dispatch(registerUserSuccess(data));
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
}