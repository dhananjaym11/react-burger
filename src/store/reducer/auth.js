import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    showLoader: false
}

const authSuccess = (state, action) => {
    const data = {
        token: action.idToken,
        userId: action.userId,
        error: null,
        showLoader: false
    }
    return updateObject(state, data);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, showLoader: true });

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_FAILED:
            return updateObject(state, { error: action.error, showLoader: false });

        default:
            return state;
    }
}

export default reducer;