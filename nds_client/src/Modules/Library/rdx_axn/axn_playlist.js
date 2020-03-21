import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  PLISTNAMES_GET,
  PLAYLIST_GET,
  PLAYLIST_SELECT,
  PLAYLIST_CREATE,
  PLAYLIST_ERROR,
  PLAYLIST_CLEAR,
  PLAYLIST_UPDATE,
  PLAYALL_GET,
  PLAYALL_ERROR
} from '../../../Main/util/axn_types';

//  =============
//  ==   GET   ==
//  =============

//============================
//  GET: All Playlist Names
export const getPListNames = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/playlist/names/all');

    dispatch({
      type: PLISTNAMES_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYALL_ERROR,
      payload: err.stack
    });
  }
};

//============================
//  GET: ALL Playlists
export const getPlayAll = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/playlist/all');

    dispatch({
      type: PLAYALL_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAYALL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Playlist by Name (list_name)
export const getPlaylist = list_id => async dispatch => {
  try {
    const res = await axios.get(`/api/library/playlist/1/${list_id}`);
    dispatch({
      type: PLAYLIST_GET,
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
  console.log('AXN pList > selectPlalist > body = ' + body);
  console.log('AXN pList > selectPlalist > plist_id = ' + plist_id);

  try {
    const res = await axios.get(`/api/library/playlist/select/${plist_id}`);
    const resString = JSON.stringify(res.data[0].trks);
    console.log('AXN PLIST > selectPlaylist() > resString = ' + resString);
    dispatch({
      type: PLAYLIST_SELECT,
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
export const createPlaylist = ({ name, creator }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //  Generate JSON body
  const body = JSON.stringify({ name, creator });
  console.log('AXN PLIST > createPlalist > body = ' + body);
  try {
    const res = await axios.post('/api/library/playlist', body, config);
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
