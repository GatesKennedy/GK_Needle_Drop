import axios from 'axios';
//  REDUX
import { setAlert } from '../../Notify/rdx_axn/axn_alert';
import {
  PROFILE_LOADED,
  PROFILE_ERROR,
  FAVORITE_UPDATE,
  FAVORITE_ERROR,
  PROFILE_UPDATE
} from '../../../Main/util/axn_types';
//  UTILS
import setAuthToken from '../../../Main/util/setAuthToken';

//===========================
//  Load User Profile (AUTH)
// export const getCurrentProfile = () => async dispatch => {
//   //  Set Headers with 'x-auth-token': 'token'
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   //  LOAD PROFILE
//   try {
//     //  Access: PRIVATE
//     const res = await axios.get('api/user/profile/me');

//     dispatch({
//       type: PROFILE_LOADED,
//       payload: res.data[0]
//     });
//   } catch (err) {
//     console.log('axn_profile.js: catch error');
//     dispatch({
//       type: PROFILE_ERROR
//     });
//   }
// };

//===========================
//  Create Profile (AUTH)
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
    //  @access     PRIVATE
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: PROFILE_UPDATE,
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

//===========================
//  Update Favorites (AUTH)
export const updateFavorite = (user_id, song_id, exists) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log('AXN PROF > updateFav > song_id = ' + song_id);
  const body = JSON.stringify({ user_id, song_id, exists });
  console.log('AXN PROF > updateFav > body = ' + body);

  try {
    //  @access     PRIVATE
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
