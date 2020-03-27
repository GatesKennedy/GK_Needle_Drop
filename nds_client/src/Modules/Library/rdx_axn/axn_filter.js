import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  FILTER_GET,
  FILTER_UPDATE,
  FILTER_ERROR,
  SEARCH_GET,
  SEARCH_ERROR,
  LIBTRAITS_GET,
  LIBTRAITS_ERROR,
  TRAITS_GET,
  TRAITS_ERROR,
  ITEMS_GET,
  ITEMS_ERROR
} from '../../../Main/util/axn_types';

//  =============
//  ==   GET   ==
//  =============

//============================
//  GET: ALL Traits
export const getTraits = () => async dispatch => {
  try {
    const res = await axios.get('/api/library/filter/traits');
    console.log(res.data);
    const payload = res.data.map(genus => ({ ...genus, isOpen: false }));
    dispatch({
      type: TRAITS_GET,
      payload: payload
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
export const getFiltered = (
  filterIn,
  libTraits,
  libraryOut
) => async dispatch => {
  const libOut = [];
  if (!filterIn) {
    try {
      const res = await axios.get('/api/library/all');
      dispatch({
        type: FILTER_GET,
        payload: res.data
      });
    } catch (err) {
      console.log('catch{} getLibrary() error');
      dispatch({
        type: FILTER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  } else if (filterIn) {
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
  try {
    //if (Object.values(filterIn).includes(trait)) {
    if (!filterIn) {
      //  filtersIn = null
      //console.log('filtersIn = null');
      const newFilters = [trait];

      dispatch({
        type: FILTER_UPDATE,
        payload: newFilters
      });
    } else if (filterIn) {
      if (filterIn.includes(trait)) {
        //  Remove 'trait' from 'filterIn'
        //console.log('filtersIn includes ' + trait);
        const newFilters = filterIn.filter(filter => filter !== trait);
        dispatch({
          type: FILTER_UPDATE,
          payload: newFilters
        });
      } else {
        //  Add 'trait' to 'filterIn'
        //console.log('filtersIn added ' + trait);
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

//============================
//  UPDATE: ALL Traits
export const updateTraits = (genusActive, traitsState) => async dispatch => {
  const payload = traitsState.map(trait => {
    console.log('genusActive: ' + genusActive);
    console.log('genus: ' + trait.genus);
    if (genusActive == trait.genus) trait.isOpen = true;
    else trait.isOpen = false;
  });
  console.log('genusActive: ' + genusActive);

  dispatch({
    type: TRAITS_GET,
    payload: payload
  });
};

//  ==============
//  ==  DELETE  ==
//  ==============

//============================
//  CLR: Trait from 'FilterIn'
//export const removeTrait = ();

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
