import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  LIBDATA_CLEAR,
  PLAYLIST_SELECT,
  TRK_SELECT,
  TRK_ERROR,
  LIBDATA_UPDATE
} from '../../../Main/util/axn_types';

const initialState = {
  library: null,
  libData: null,
  artistData: null,
  trkData: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  LIBDATA
    case LIBRARY_GET:
    case LIBDATA_UPDATE:
    case PLAYLIST_SELECT:
      return {
        ...state,
        libData: payload,
        loading: false
      };
    case TRK_SELECT:
      return {
        ...state,
        trkData: payload,
        loading: false
      };
    //  CLEAR
    case LIBDATA_CLEAR:
      return {
        ...state,
        libData: null,
        loading: false
      };
    //  ERROR
    case LIBRARY_ERROR:
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
