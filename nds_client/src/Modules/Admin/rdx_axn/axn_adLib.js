import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  AD_PLAYALL_GET,
  AD_PLAYALL_ERROR,
  AD_PLAYLIST_GET,
  AD_PLAYLIST_UPDATE,
  AD_PLAYLIST_DELETE,
  AD_PLAYLIST_ERROR
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
      type: AD_PLAYALL_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_PLAYALL_ERROR,
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
      type: AD_PLAYLIST_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_adLib: catch error');

    dispatch({
      type: AD_PLAYLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//============================
//  GET: Select Playlist Button
export const selectPlaylist = pList => {
  try {
    return {
      type: 'AD_PLAYLIST_GET',
      payload: pList
    };
  } catch (err) {
    return {
      type: 'AD_PLAYLIST_ERROR'
    };
  }
};

//  ==============
//  ==   POST   ==
//  ==============

//  ==============
//  ==  UPDATE  ==
//  ==============

//  ==============
//  ==  DELETE  ==
//  ==============
