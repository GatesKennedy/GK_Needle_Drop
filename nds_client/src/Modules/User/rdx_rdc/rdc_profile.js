import {
  PROFILE_GET,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  PROFILE_UPDATE,
  PROFILES_GET,
  FAVORITE_GET,
  FAVORITE_UPDATE,
  FAVORITE_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  profile: null,
  profiles: [],
  favorites: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  SELF
    case PROFILE_GET:
      return {
        ...state,
        profile: payload,
        loading: false
      };
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
