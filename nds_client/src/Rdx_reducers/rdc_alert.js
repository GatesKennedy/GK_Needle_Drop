import { SET_ALERT, REMOVE_ALERT } from '../Rdx_actions/axn_types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Add alert to 'state'
    case SET_ALERT:
      return [...state, payload];
    // Remove alert from 'state'
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    // Return state
    default:
      return state;
  }
}
