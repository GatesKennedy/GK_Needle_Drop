import axios from 'axios';
import { setAlert } from '../../Notify/rdx_axn/axn_alert';

import { LIBRARY_GET, LIBRARY_ERROR } from '../../../util/axn_types';

// Get current LIBRARY Applications
export const getLibrary = () => async dispatch => {
  try {
    const res = await axios.get('/api/library');

    dispatch({
      type: LIBRARY_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_library.js: getLibrary() catch error');
    dispatch({
      type: LIBRARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
