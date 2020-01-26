import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  ARTISTS_GET,
  ARTISTS_ERROR,
  ARTIST_GET,
  ARTIST_ERROR,
  PLAYLIST_GET,
  PLAYLIST_UPDATE,
  PLAYLIST_CLEAR,
  PLAYLIST_ERROR,
  FILTER_CLEAR
} from '../../../util/axn_types';

const initialState = {
  libData: null,
  plistData: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case LIBRARY_GET:
    case ARTISTS_GET:
    case ARTIST_GET:
    case PLAYLIST_GET:
      return {
        ...state,
        libData: payload,
        loading: false
      };
    //  UPDATE
    case PLAYLIST_UPDATE:
      return {
        ...state,
        plistData: payload,
        loading: false
      };
    //  CLEAR
    case PLAYLIST_CLEAR:
      return {
        ...state,
        libData: payload,
        plistData: null,
        loading: false
      };
    //  ERROR
    case LIBRARY_ERROR:
    case ARTISTS_ERROR:
    case ARTIST_ERROR:
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
