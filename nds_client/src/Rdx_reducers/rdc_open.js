import { OPEN_GET, OPEN_ERROR } from '../Rdx_actions/axn_types';

const initialState = {
  appList: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_GET:
      return {
        ...state,
        appList: payload,
        loading: false
      };
    case OPEN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
