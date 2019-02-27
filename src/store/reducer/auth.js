import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    authData: [],
    showLoader: false,
    purchased: false
}

const authSuccess = (state, action) => {
    const data = {
        authData: { ...action.authData },
        showLoader: false
    }
    return updateObject(state, data);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { showLoader: true });

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_FAILED:
            return updateObject(state, { showLoader: false });

        default:
            return state;
    }
}

export default reducer;