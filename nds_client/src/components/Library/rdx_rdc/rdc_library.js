import { LIBRARY_GET, LIBRARY_ERROR } from '../../../util/axn_types';

const initialState = {
  libraryOut: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIBRARY_GET:
      return {
        ...state,
        libraryOut: payload,
        loading: false
      };
    case LIBRARY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
