import axios from 'axios';
import { setAlert } from '../../Notify/rdx_axn/axn_alert';

import {
  PROFILE_GET,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  REPOS_GET,
  PROFILES_GET,
  FAVORITE_UPDATE,
  FAVORITE_ERROR
} from '../../../Main/util/axn_types';

//  =============
//  ==   GET   ==
//  =============

//  Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_profile.js: catch error');

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: PROFILE_CLEAR });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: PROFILES_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_profile.js: catch error');

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Get Profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user${userId}`);

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Create or Update Profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dash');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  ==============
//  ==  UPDATE  ==
//  ==============

//  @desc       Update Favorites
//  @access     PRIVATE
export const updateFavorite = (user_id, song_id, exists) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log('axn_PROF: ' + song_id);
  const body = JSON.stringify({ user_id, song_id, exists });
  console.log(body);

  try {
    const res = await axios.post('/api/user/profile/favorite', body, config);

    dispatch({
      type: FAVORITE_UPDATE,
      payload: res.data
    });
    dispatch(setAlert('Favorites Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }

    dispatch({
      type: FAVORITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  ==============
//  ==  DELETE  ==
//  ==============
