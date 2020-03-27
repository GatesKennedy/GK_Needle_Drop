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
  PROFILE_LOADED,
  PROFILE_CREATE,
  PROFILE_CLEAR,
  PROFILE_ERROR,
  PLAYLIST_GET_USER,
  PLAYLIST_GET_FAV,
  PLAYLIST_ERROR_USER,
  PLAYLIST_ERROR_FAV
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
    console.log('AXN AUTH > loadUser() > LOAD_USER');
    const res = await axios.get('api/auth');
    // const resString = JSON.stringify(res.data);
    // console.log('AUTH LOAD USER: res.data = ' + resString);
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
    console.log('AXN AUTH > loadUser() > LOAD_PROFILE');
    //  Access: PRIVATE
    const res = await axios.get('api/user/profile/me');

    dispatch({
      type: PROFILE_LOADED,
      payload: res.data[0]
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }

  //  LOAD PLAYLISTS
  try {
    console.log('AXN AUTH > loadUser() > LOAD_PLAYLIST');
    //  Access: PRIVATE
    const res = await axios.get('/api/library/playlist/user');
    console.log('AXN > loadUser() > User Plists = ' + res.data);

    dispatch({
      type: PLAYLIST_GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYLIST_ERROR_USER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }

  //  LOAD Favorites
  try {
    console.log('AXN AUTH > loadUser() > LOAD_FAVORITES');
    //  Access: PRIVATE
    const res = await axios.get('/api/library/playlist/favs');
    const resString = JSON.stringify(res.data);
    console.log('AXN > loadUser() > User Favs = ' + resString);

    dispatch({
      type: PLAYLIST_GET_FAV,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYLIST_ERROR_FAV,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Register User / Auth User
//==========================
export const register = ({
  username,
  email,
  password,
  role = 'user'
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ username, email, password, role });

  //  Create User
  try {
    const res = await axios.post('/api/auth/register', body, config);
    const resString = JSON.stringify(res.data);
    console.log('AUTH REGI: res.data = ' + resString);
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
    //  SET GLOBAL HEADER with Token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    //  CREATE PROFILE
    const rez = await axios.post('/api/user/profile/create');
    const rezString = JSON.stringify(rez.data[0]);
    console.log('AXN AUTH > Register > rez.data = ' + rezString);
    dispatch({
      type: PROFILE_CREATE,
      payload: rez.data[0]
    });
    setAlert('WELCOME, Friend!', 'success');
    //  LOAD USER/PROFILE
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
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
    //  LOAD USER
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Welcome!', 'success'));
  } catch (err) {
    //  CATCH Error
    console.log('axn_auth.js FAIL');
    const errors = err.response.data.errors;
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
