import { combineReducers } from 'redux';
// === comps ===
//    === Admin ===
import admin from '../../Modules/Admin/rdx_rdc/rdc_adLib';
//    === Ecomm ===

//    === Library ===
import library from '../../Modules/Library/rdx_rdc/rdc_library';
import search from '../../Modules/Library/rdx_rdc/rdc_search';
import filter from '../../Modules/Library/rdx_rdc/rdc_filter';
//import traits from '../components/Library/rdx_rdc/rdc_traits';
//    === Main ===

//    === Notify ===
import alert from '../../Modules/Notify/rdx_rdc/rdc_alert';
//    === User ===
import auth from '../../Modules/User/rdx_rdc/rdc_auth';
import profile from '../../Modules/User/rdx_rdc/rdc_profile';

export default combineReducers({
  admin,
  library,
  search,
  filter,
  alert,
  auth,
  profile
});
