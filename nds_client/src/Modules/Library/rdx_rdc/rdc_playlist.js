import {
  PLAYLIST_GET,
  PLAYLIST_CREATE,
  PLAYLIST_UPDATE,
  PLAYLIST_DELETE,
  PLAYLIST_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  pListAdmin: null,
  pListUser: null,
  pListSelected: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case PLAYLIST_GET:
    case PLAYLIST_CREATE:
    case PLAYLIST_UPDATE:
    case PLAYLIST_DELETE:
      return {
        ...state,
        pListAdmin: payload,
        loading: false
      };
    //  ERROR
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
