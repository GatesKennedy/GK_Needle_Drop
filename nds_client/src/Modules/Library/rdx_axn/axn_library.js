import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  FILTER_CLEAR,
  ARTISTS_GET,
  ARTISTS_ERROR,
  ARTIST_GET,
  ARTIST_ERROR,
  TRK_SELECT,
  TRK_ERROR
} from '../../../Main/util/axn_types';

//=============================
// GET: Library Tracks (All)

export const getLibrary = () => async dispatch => {
  console.log('FXN: getLibrary()');
  try {
    const res = await axios.get('/api/library');
    dispatch({
      type: LIBRARY_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('catch{} getLibrary() error');
    dispatch({
      type: LIBRARY_ERROR,
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

    const res = await axios.get('/api/library/boone_howard');
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

//=============================
// GET: Select Song

export const selectTrk = trkId => async dispatch => {
  try {
    const res = await axios.get(`/api/library/track/${trkId}`);

    dispatch({
      type: TRK_SELECT,
      payload: res.data
    });
  } catch (err) {
    console.log('catch(err): selectTrk() error');
    dispatch({
      type: TRK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//=============================
// GET: Select Playlist

export const selectPlist = trkId => async dispatch => {
  try {
    const res = await axios.get(`/api/library/track/${trkId}`);

    dispatch({
      type: TRK_SELECT,
      payload: res.data
    });
  } catch (err) {
    console.log('catch(err): selectTrk() error');
    dispatch({
      type: TRK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
