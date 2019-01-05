import * as actions from './constants/actionConstants';

export function beginCall() {
    return { type: actions.AJAX_BEGIN_CALL }
}

export function endCall() {
    return { type: actions.AJAX_END_CALL }
}