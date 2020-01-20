import axios from 'axios';
import { setAlert } from '../../Notify/rdx_axn/axn_alert';

import {
  BROWLIST_GET,
  BROWLIST_ERROR,
  FILTER_CLEAR,
  ARTISTS_GET,
  ARTISTS_ERROR,
  ARTIST_GET,
  ARTIST_ERROR
} from '../../../util/axn_types';

//=============================
// GET: Library Tracks (All)

export const getBrowList = () => async dispatch => {
  dispatch({ type: FILTER_CLEAR });
  console.log('FXN: getBrowList()');
  try {
    console.log('try{} getBrowList()');

    const res = await axios.get('/api/library');
    console.log();
    dispatch({
      type: BROWLIST_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('catch{} getBrowList() error');

    dispatch({
      type: BROWLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//=============================
// GET: Library Artists (All)

export const getArtists = () => async dispatch => {
  console.log('FXN: getArtists()');
  try {
    console.log('try{} getArtists()');

    const res = await axios.get('/api/library/artists');
    dispatch({
      type: ARTISTS_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('catch{} getArtist() error');

    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//=============================
// GET: Artist by ID

export const getArtist = artistId => async dispatch => {
  console.log('FXN: getArtists()');
  try {
    console.log('try{} getArtist()');

    const res = await axios.get(`/api/library/artists/${artistId}`);
    dispatch({
      type: ARTIST_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('catch{} getArtists() error');

    dispatch({
      type: ARTISTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
