import axios from '../../../../node_modules/axios';
import { setAlert } from '../../Notify/rdx_axn/axn_alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PROFILE_CLEAR
} from '../../../Main/util/axn_types';
import setAuthToken from '../../../Main/util/setAuthToken';

//  Register User
export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/user/register', body, config);
    // disp  1
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    // disp  2
    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    // disp 1
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }
    // disp 2
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//  Login User
export const login = ({ username, password }) => async dispatch => {
  const body = JSON.stringify({ username, password });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/user/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log('axn_auth.js FAIL');
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }
    console.log('no Errors..');
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//  Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: PROFILE_CLEAR });
  dispatch({ type: LOGOUT });
};

//  Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('api/user/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
