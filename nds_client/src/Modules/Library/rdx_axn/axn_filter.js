import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

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
  TRAITS_ERROR,
  ITEMS_GET,
  ITEMS_ERROR,
  TRK_UPDATE
} from '../../../Main/util/axn_types';

//  =============
//  ==   GET   ==
//  =============

//============================
//  GET: ALL Traits
export const getTraits = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter/traits');
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

//============================
//  GET: Trait Types (Genus)
export const getTraitGenus = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter/genus');

    dispatch({
      type: TRAITS_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_filter: catch error');

    dispatch({
      type: TRAITS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Trait Items (Species)
export const getTraitSpecies = genus => async dispatch => {
  console.log('GET: Species AXN');
  try {
    const res = await axios.get(`/api/library/filter/traits/${genus}`);

    dispatch({
      type: ITEMS_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_filter: catch error');

    dispatch({
      type: ITEMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//============================
//  GET: Filtered
export const getFiltered = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter');

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

//============================
//  GET: Searched
export const getSearched = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/search');

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

//  ==============
//  ==   POST   ==
//  ==============

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

//  ==============
//  ==  UPDATE  ==
//  ==============
export const updateFilterIn = (trait, filterIn) => async dispatch => {
  console.log('FXN: updateFilterIn ,, Trait: ' + trait);

  try {
    //if (Object.values(filterIn).includes(trait)) {
    if (!filterIn) {
      //  filtersIn = null
      const newFilters = [trait];

      dispatch({
        type: FILTER_UPDATE,
        payload: newFilters
      });
    } else if (filterIn) {
      if (filterIn.includes(trait)) {
        //  Remove 'trait' from 'filterIn'
        const newFilters = filterIn.filter(filter => filter !== trait);
        dispatch({
          type: FILTER_UPDATE,
          payload: newFilters
        });
      } else {
        //  Add 'trait' to 'filterIn'
        dispatch({
          type: FILTER_UPDATE,
          payload: [...filterIn, trait]
        });
      }
    }
  } catch (err) {
    console.log('FXN: updateFilterIn ,, Error');
    dispatch({
      type: FILTER_ERROR,
      payload: null
    });
  }
};

//  ==============
//  ==  DELETE  ==
//  ==============

//============================
//  CLR: Traits

//    #*#*# ...this is a state change?

// export const clearFilters = () => async dispatch => {
//   console.log('axn_filters: Enter clearFilters()');
//   try {
//     const res = await axios.
//   } catch (err) {

//   }
// }
