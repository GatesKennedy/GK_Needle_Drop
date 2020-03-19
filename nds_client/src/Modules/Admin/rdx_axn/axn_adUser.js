import axios from 'axios';
import { setAlert } from '../../Notify/rdx_axn/axn_alert';
//  AXN_TYPES
import {} from '../../../Main/util/axn_types';

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

//===========================
//  Create Profile
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
