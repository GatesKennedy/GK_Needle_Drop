import axios from 'axios';
import { setAlert } from './axn_alert';

import { OPEN_GET, OPEN_ERROR, SELF_ERROR } from './axn_types';

// Get current Open Applications
export const getOpenApps = () => async dispatch => {
  try {
    const res = await axios.get('/api/open');

    dispatch({
      type: OPEN_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_open.js: getOpenApps() catch error');
    dispatch({
      type: OPEN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
