import axios from 'axios';
import { setAlert } from '../../Notify/rdx_axn/axn_alert';

import {
  FILTER_GET,
  FILTER_UPDATE,
  FILTER_CLEAR,
  FILTER_ERROR,
  SEARCH_GET,
  SEARCH_UPDATE,
  SEARCH_CLEAR,
  SEARCH_ERROR,
  TRAITS_GET,
  TRAITS_UPDATE,
  TRAITS_CLEAR,
  TRAITS_ERROR
} from '../../../util/axn_types';

//  Get Filtered
export const getFilter = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter_list');

    dispatch({
      type: FILTER_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_FILTER.js: catch error');

    dispatch({
      type: FILTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Get Searched
export const getSearch = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter_list');

    dispatch({
      type: SEARCH_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_Search.js: catch error');

    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Get Traits
export const getTraits = Traits => async dispatch => {
  try {
    const res = await axios.get(`/api/library/FILTER${Traits}`);

    dispatch({
      type: TRAITS_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRAITS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Create or Update Traits
export const createTraits = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/library/traits', formData, config);

    dispatch({
      type: TRAITS_GET,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Traits Updated' : 'Traits Created', 'success'));

    if (!edit) {
      history.push('/library/traits');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }

    dispatch({
      type: TRAITS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
