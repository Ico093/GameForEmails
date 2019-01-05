import * as actions from '../actions/constants/actionConstants';

export default (state = [], action) => {
    switch (action.type) {
        case actions.LOAD_PROVIDERS_SUCCESS:
            return [...action.providers]
        default:
            return state;
    }
}