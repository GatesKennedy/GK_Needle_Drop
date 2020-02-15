import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  AD_PLAYLIST_GET,
  AD_PLAYALL_GET,
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
    const res = await axios.get('/api/library/playlist');

    dispatch({
      type: AD_PLAYALL_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRAITS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Trait Types (Genus)
export const getPlaylist = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter/genus');

    dispatch({
      type: TRAITS_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_filter: catch error');

    dispatch({
      type: TRAITS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Trait Items (Species)
export const getSongs = genus => async dispatch => {
  console.log('GET: Species AXN');
  try {
    const res = await axios.get(`/api/library/filter/traits/${genus}`);

    dispatch({
      type: ITEMS_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_filter: catch error');

    dispatch({
      type: ITEMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Searched
export const getSearched = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/search');

    dispatch({
      type: SEARCH_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_Search.js: catch error');

    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
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
