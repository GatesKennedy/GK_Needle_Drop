import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  LIB_RESULT_UPDATE,
  LIB_RESULT_CLEAR,
  LIB_TYPE_UPDATE,
  PLAYLIST_SELECT,
  TRK_SELECT,
  TRK_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  library: null,
  libResult: null,
  libType: 'filtering',
  artistData: null,
  trkData: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  LIBRESULT
    case LIBRARY_GET:
    case LIB_RESULT_UPDATE:
      return {
        ...state,
        libResult: payload,
        loading: false
      };
    case LIB_TYPE_UPDATE:
      return {
        ...state,
        libType: payload.libType,
        libResult: payload.libResult,
        loading: false
      };
    case TRK_SELECT:
      return {
        ...state,
        trkData: payload,
        loading: false
      };
    //  CLEAR
    case LIB_RESULT_CLEAR:
      return {
        ...state,
        libResult: null,
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
