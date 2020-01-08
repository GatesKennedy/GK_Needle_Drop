import {
  LIBRARY_GET,
  LIBRARY_ERROR,
  SEARCH_GET,
  SEARCH_ERROR,
  FILTER_GET,
  FILTER_ERROR,
  TRAITS_GET,
  TRAITS_UPDATE,
  TRAITS_CLEAR,
  TRAITS_ERROR
} from '../../../util/axn_types';

const initialState = {
  libraryOut: null,
  traitsIn: null,
  searchIn: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIBRARY_GET:
    case FILTER_GET:
    case SEARCH_GET:
      return {
        ...state,
        libraryOut: payload,
        loading: false
      };
    case TRAITS_GET:
    case TRAITS_UPDATE:
      return {
        ...state,
        traitsIn: payload,
        loading: false
      };
    case TRAITS_CLEAR:
      return {
        ...state,
        traitsIn: null,
        loading: false
      };
    case FILTER_ERROR:
    case LIBRARY_ERROR:
    case SEARCH_ERROR:
    case TRAITS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
