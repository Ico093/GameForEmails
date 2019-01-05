import * as actions from '../actions/constants/actionConstants';

export default (state = {}, action) => {
    switch (action.type) {
        case actions.LOAD_QUESTIONS_AND_ANSWERS_SUCCESS:
            return Object.assign({}, action.task);
        case actions.CLEAR_TASK:
            return {};
        default:
            return state;
    }
}