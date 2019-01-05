import * as actions from '../actions/constants/actionConstants';

function getInitialUserState() {
    if (localStorage.authorizationKey) {
        return {
            isLogged: true,
            hasPlayed: localStorage.hasPlayed,
            authorizationKey: localStorage.authorizationKey
        }
    }

    return {};
}

function registerUserSuccess(userData) {
    const authorizationKey = `${userData.token_type} ${userData.access_token}`;

    localStorage.setItem('authorizationKey', authorizationKey);

    return Object.assign({}, {
        isLogged: true,
        authorizationKey: authorizationKey
    });
}

function userFinishedPlaying(state) {
    localStorage.setItem('hasPlayed', true);

    return Object.assign(state, {
        hasPlayed: true
    })
}

export default (state = getInitialUserState(), action) => {
    switch (action.type) {
        case actions.REGISTER_USER_SUCCESS:
            return registerUserSuccess(action.userData);
        case actions.USER_FINISHED_PLAYING:
            return userFinishedPlaying(state);
        default:
            return state;
    }
}