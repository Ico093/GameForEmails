import * as actions from '../actions/constants/actionConstants';

export default (state = [], action) => {
    switch (action.type) {
        case actions.LOAD_RESULTS_SUCCESS:
            return [...action.results];
        case actions.DELETE_RESULTS_SUCCESS:
            let currentResults = state;

            action.results.map(item => {
                currentResults = currentResults.filter(x => x.email !== item);
            });

            return [...currentResults]
        default:
            return state;
    }
}