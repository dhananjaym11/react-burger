import * as actionType from './actionType';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionType.AUTH_START,
        showLoader: true
    }
}

const authSuccess = (data) => {
    return {
        type: actionType.AUTH_SUCCESS,
        authData: data,
        showLoader: false
    }
}

const authFailed = () => {
    return {
        type: actionType.AUTH_FAILED,
        showLoader: false
    }
}

export const initAuth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDz5L1ogY9Ky23H6R8MUX1lKC3tHjXa0Aw', data)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFailed());
            });
    }
}