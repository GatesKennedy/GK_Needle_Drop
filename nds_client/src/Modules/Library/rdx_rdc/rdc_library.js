import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  PLAYLIST_GET,
  PLAYLIST_ERROR,
  ARTISTS_GET,
  ARTISTS_ERROR,
  ARTIST_GET,
  ARTIST_ERROR,
  TRK_SELECT,
  TRK_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  libData: null,
  artistsData: null,
  trkData: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    //  Display Library
    case LIBRARY_GET:
    case ARTIST_GET:
    case PLAYLIST_GET:
      return {
        ...state,
        libData: payload,
        loading: false
      };
    case ARTISTS_GET:
      return {
        ...state,
        artistsData: payload,
        loading: false
      };
    case TRK_SELECT:
      return {
        ...state,
        trkData: payload,
        loading: false
      };
    //  ERROR
    case LIBRARY_ERROR:
    case PLAYLIST_ERROR:
    case ARTISTS_ERROR:
    case ARTIST_ERROR:
    case TRK_ERROR:
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
