import { FILTER_GET, FILTER_ERROR } from '../../../util/axn_types';

const initialState = {
  appList: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILTER_GET:
      return {
        ...state,
        appList: payload,
        loading: false
      };
    case FILTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
