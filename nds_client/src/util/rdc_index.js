import { combineReducers } from 'redux';
// === comps ===
//    === Admin ===

//    === Ecomm ===

//    === Library ===
import library from '../components/Library/rdx_rdc/rdc_library';
import search from '../components/Library/rdx_rdc/rdc_search';
import filter from '../components/Library/rdx_rdc/rdc_filter';
//import traits from '../components/Library/rdx_rdc/rdc_traits';
//    === Main ===

//    === Notify ===
import alert from '../components/Notify/rdx_rdc/rdc_alert';
//    === User ===
import auth from '../components/User/rdx_rdc/rdc_auth';
import profile from '../components/User/rdx_rdc/rdc_profile';

export default combineReducers({
  search,
  filter,
  alert,
  auth,
  profile
});