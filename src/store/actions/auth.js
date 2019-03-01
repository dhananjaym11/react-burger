import * as actionType from './actionType';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionType.AUTH_START,
        showLoader: true
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

const authFailed = (error) => {
    return {
        type: actionType.AUTH_FAILED,
        showLoader: false,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const initAuth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = isSignup ?
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDz5L1ogY9Ky23H6R8MUX1lKC3tHjXa0Aw'
            :
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDz5L1ogY9Ky23H6R8MUX1lKC3tHjXa0Aw';

        axios.post(url, data)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFailed(err.response.data.error));
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            const localExpiry = new Date(localStorage.getItem('expirationDate'));
            if (localExpiry > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(localToken, userId));
                dispatch(checkAuthTimeout((localExpiry.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    }
}