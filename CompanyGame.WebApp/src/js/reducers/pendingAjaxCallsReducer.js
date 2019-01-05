import * as actions from '../actions/constants/actionConstants';

export default (state = 0, action) => {
    switch (action.type) {
        case actions.AJAX_BEGIN_CALL:
            return state + 1;
        case actions.AJAX_END_CALL:
            return state - 1;
        default:
            return state;
    }
}