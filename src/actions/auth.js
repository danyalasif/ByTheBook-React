import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants/action-types';
import api from '../api';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = user => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.bythebookJWT = user.token;
        dispatch(userLoggedIn(user));
    });

export const logout = () => dispatch => {
    localStorage.removeItem('bythebookJWT');
    api.user.logout();

    dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
    api.user.confirm(token).then(user => {
        localStorage.bythebookJWT = user.token;
        dispatch(userLoggedIn(user));
    });
