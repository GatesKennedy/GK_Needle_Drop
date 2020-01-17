import {
  SEARCH_GET,
  SEARCH_UPDATE,
  SEARCH_CLEAR,
  SEARCH_ERROR,
  FILTER_GET,
  FILTER_UPDATE,
  FILTER_CLEAR,
  FILTER_ERROR
} from '../../../util/axn_types';

const initialState = {
  libraryOut: null,
  filterIn: null,
  searchIn: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case FILTER_GET:
    case SEARCH_GET:
      return {
        ...state,
        libraryOut: payload,
        loading: false
      };
    //  UPDATE
    case FILTER_UPDATE:
    case SEARCH_UPDATE:
      return {
        ...state,
        filterIn: payload,
        loading: false
      };
    //  CLEAR
    case FILTER_CLEAR:
    case SEARCH_CLEAR:
      return {
        ...state,
        filterIn: null,
        loading: false
      };
    //  ERROR
    case FILTER_ERROR:
    case SEARCH_ERROR:
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
