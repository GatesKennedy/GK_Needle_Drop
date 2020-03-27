import {
  PROFILE_LOADED,
  PROFILE_CREATE,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  PROFILE_UPDATE,
  PROFILES_GET,
  PLAYLIST_GET_USER,
  FAVORITE_GET,
  FAVORITE_UPDATE,
  FAVORITE_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  profile: null,
  history: null,
  playlists: [],
  favorites: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  SELF
    case PROFILE_LOADED:
      return {
        ...state,
        profile: payload.profile,
        favorites: payload.favorites,
        loading: false
      };
    case PLAYLIST_GET_USER:
      return {
        ...state,
        playlists: payload,
        loading: false
      };
    case PROFILE_CREATE:
    case PROFILE_UPDATE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_CLEAR:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case PROFILES_GET:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case FAVORITE_GET:
    case FAVORITE_UPDATE:
      return {
        ...state,
        favorites: payload,
        loading: false
      };
    //  ERRORS
    case FAVORITE_ERROR:
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
