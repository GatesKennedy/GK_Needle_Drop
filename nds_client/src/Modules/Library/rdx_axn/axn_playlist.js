import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  PLAYLIST_GET_ADMIN,
  PLAYLIST_GET_USER,
  PLAYLIST_SELECT,
  PLAYLIST_CREATE,
  PLAYLIST_UPDATE,
  PLAYLIST_DELETE,
  PLAYLIST_ERROR,
  LIB_RESULT_UPDATE
} from '../../../Main/util/axn_types';

//  =============
//  ==   GET   ==
//  =============

//============================
//  GET: Playlists ALL
export const getPlistAll = () => async dispatch => {
  try {
    //  Get Admin Playlists
    getPlistAdmin();
    //  Get AUTH user Playlists
    getPlistUser();
  } catch (err) {
    //  CATCH Error
    console.log('axn_auth.js FAIL');
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }
    dispatch({
      type: PLAYLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Playlists ADMIN
export const getPlistAdmin = () => async dispatch => {
  try {
    // Get Admin Playlists
    const res = await axios.get('/api/library/playlist/admin');
    console.log('AXN > getPlistAdmin() > Admin Plists = ' + res.data);

    dispatch({
      type: PLAYLIST_GET_ADMIN,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Playlists USER
export const getPlistUser = () => async dispatch => {
  try {
    // Get User Playlists
    const res = await axios.get('/api/library/playlist/user');
    console.log('AXN > getPlistUser() > User Plists = ' + res.data);

    dispatch({
      type: PLAYLIST_GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  Select Playlist (Button)
export const selectPlaylist = plist_id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //  Generate JSON body
  const body = JSON.stringify({ plist_id });
  console.log('AXN > selectPlaylist() > plist_id: ' + plist_id);
  try {
    const res = await axios.get(`/api/library/playlist/select/${plist_id}`);
    dispatch({
      type: PLAYLIST_SELECT,
      payload: res.data[0].trks
    });
    dispatch({
      type: LIB_RESULT_UPDATE,
      payload: res.data[0].trks
    });
  } catch (err) {
    dispatch({
      type: PLAYLIST_ERROR
    });
  }
};

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST
//  @desc       Create Playlist
//  @access     PRIVATE
export const createPlaylist = (pListName, creator) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //  Generate JSON body
  const body = JSON.stringify(pListName, creator);
  console.log('AXN PLIST > createPlalist > body = ' + body);
  try {
    const res = await axios.post('/api/library/playlist/create', body, config);
    dispatch({
      type: PLAYLIST_CREATE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }
    dispatch({
      type: PLAYLIST_ERROR
    });
  }
};

//  ==============
//  ==  UPDATE  ==
//  ==============

//  ==============
//  ==  DELETE  ==
//  ==============

export const deletePlaylist = plist_id => async dispatch => {
  // ><><><><>< AUTH USER ><><><><><
  console.log('AXN > deletePlaylist() > plist_id: ' + plist_id);
  // Generate JSON body
  const body = JSON.stringify({ plist_id });
  console.log('AXN PLIST > delete Playlist > body = ' + body);
  try {
    //  Check for Playlist
    const check = await axios.get(`/api/library/playlist/check/${plist_id}`);
    const checkString = JSON.stringify(check.data);
    console.log('checkString: ' + checkString);
    if (!check.data) {
      console.log('deletePlaylist() > Check Fail');
      dispatch({
        type: PLAYLIST_ERROR
      });
    }
    //  DELETE Playlist
    const res = await axios.delete(`/api/library/playlist/delete/${plist_id}`);
    const resString = JSON.stringify(res.data);
    console.log('resString: ' + resString);
    dispatch({
      type: PLAYLIST_DELETE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    //const errors = err.check.data.errors;
    // if (err) {
    //   err.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    // }
  }
};

//============================
//  CLR: Traits

//    #*#*# ...this is a state change?

// export const clearFilters = () => async dispatch => {
//   console.log('axn_filters: Enter clearFilters()');
//   try {
//     const res = await axios.
//   } catch (err) {

//   }
// }
