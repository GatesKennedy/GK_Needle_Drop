import {
  SEARCH_GET,
  SEARCH_UPDATE,
  SEARCH_CLEAR,
  SEARCH_ERROR,
  FILTER_GET,
  FILTER_UPDATE,
  FILTER_CLEAR,
  FILTER_ERROR,
  LIBTRAITS_GET,
  LIBTRAITS_ERROR,
  TRAITS_GET,
  TRAITS_UPDATE,
  TRAITS_ERROR,
  ITEMS_GET,
  ITEMS_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  libraryOut: null,
  filterIn: null,
  searchIn: null,
  traits: null,
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
    case ITEMS_GET:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case TRAITS_GET:
      return {
        ...state,
        traits: payload,
        loading: false
      };
    case LIBTRAITS_GET:
      return {
        ...state,
        libTraits: payload,
        loading: false
      };
    //  UPDATE
    case TRAITS_UPDATE:
      return {
        ...state,
        traits: payload,
        loading: false
      };
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
    case LIBTRAITS_ERROR:
    case TRAITS_ERROR:
    case ITEMS_ERROR:
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
