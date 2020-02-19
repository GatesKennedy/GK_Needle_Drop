import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  PLAYLIST_GET,
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
export const getPlaylist = list_name => async dispatch => {
  try {
    const res = await axios.get(`/api/library/playlist/1/${list_name}`);

    dispatch({
      type: PLAYLIST_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_adLib: catch error');

    dispatch({
      type: PLAYLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Select Playlist Button
export const selectPlaylist = pList => {
  try {
    return {
      type: 'PLAYLIST_GET',
      payload: pList
    };
  } catch (err) {
    return {
      type: 'PLAYLIST_ERROR'
    };
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