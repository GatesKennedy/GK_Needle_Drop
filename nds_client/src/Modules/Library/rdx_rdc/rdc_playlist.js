import {
  PLAYLIST_GET,
  PLAYLIST_ERROR,
  PLAYLIST_CLEAR,
  PLAYLIST_UPDATE,
  PLAYALL_GET,
  PLAYALL_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  allListData: null,
  plistData: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case PLAYLIST_GET:
      return {
        ...state,
        plistData: payload,
        loading: false
      };
    case PLAYALL_GET:
      return {
        ...state,
        allListData: payload,
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
        plistData: null,
        loading: false
      };
    //  ERROR
    case PLAYALL_ERROR:
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
