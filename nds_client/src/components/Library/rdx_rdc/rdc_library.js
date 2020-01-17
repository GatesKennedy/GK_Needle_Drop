import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  ARTISTS_GET,
  ARTISTS_ERROR,
  PLAYLIST_GET,
  PLAYLIST_UPDATE,
  PLAYLIST_CLEAR,
  PLAYLIST_ERROR
} from '../../../util/axn_types';

const initialState = {
  libraryOut: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case LIBRARY_GET:
    case ARTISTS_GET:
    case PLAYLIST_GET:
      return {
        ...state,
        libraryOut: payload,
        loading: false
      };
    //  UPDATE
    case PLAYLIST_UPDATE:
      return {
        ...state,
        playlistIn: payload,
        loading: false
      };
    //  CLEAR
    case PLAYLIST_CLEAR:
      return {
        ...state,
        playlistIn: null,
        loading: false
      };
    //  ERROR
    case LIBRARY_ERROR:
    case ARTISTS_ERROR:
    case PLAYLIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    //  DEFAULT
    default:
      return state;
  }
}
