import axios from '../../../../node_modules/axios';
//  REDUX
import { setAlert } from '../../Notify/rdx_axn/axn_alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PROFILE_GET,
  PROFILE_CLEAR,
  PROFILE_ERROR
} from '../../../Main/util/axn_types';
//  UTILS
import setAuthToken from '../../../Main/util/setAuthToken';

//  Load User / Auth User
//==========================
export const loadUser = () => async dispatch => {
  //  Set Headers with 'x-auth-token': 'token'
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  //  LOAD USER
  try {
    const res = await axios.get('api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
  //  LOAD PROFILE
  try {
    console.log('enter LOAD_PROFILE');
    const res = await axios.get('api/user/profile/me');
    const resString = JSON.stringify(res.data);
    console.log('LOAD RES.DATA: ' + resString);
    dispatch({
      type: PROFILE_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

//  Register User / Auth User
//==========================
export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, email, password });
  //  Create User
  try {
    const res = await axios.post('/api/auth/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
  //  Create Profile
  try {
    const res = await axios.post('/api/profile/me');
  } catch (err) {}
};

//  Login User / Auth User
//==========================
export const login = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Welcome!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log('axn_auth.js FAIL');
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//  Logout / Clear Profile
//==========================
export const logout = () => dispatch => {
  dispatch({ type: PROFILE_CLEAR });
  dispatch({ type: LOGOUT });
};
