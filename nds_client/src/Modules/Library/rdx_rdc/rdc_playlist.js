import {
  PLAYLIST_GET_ADMIN,
  PLAYLIST_GET_USER,
  PLAYLIST_SELECT,
  PLAYLIST_CREATE,
  PLAYLIST_UPDATE,
  PLAYLIST_DELETE,
  PLAYLIST_ERROR,
  PLAYLIST_GET_FAV
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
    case PLAYLIST_GET_ADMIN:
      return {
        ...state,
        pListAdmin: payload,
        loading: false
      };
    case PLAYLIST_GET_USER:
      return {
        ...state,
        pListUser: { ...state.pListUser, Custom: payload },
        loading: false
      };
    case PLAYLIST_GET_FAV:
      return {
        ...state,
        pListUser: { ...state.pListUser, Favorite: payload },
        loading: false
      };
    case PLAYLIST_SELECT:
      return {
        ...state,
        pListSelected: payload,
        loading: false
      };
    //  POST
    case PLAYLIST_CREATE:
    case PLAYLIST_UPDATE:
    case PLAYLIST_DELETE:
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
