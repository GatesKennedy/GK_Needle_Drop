import { combineReducers } from 'redux';
// === comps ===
//    === Main ===

//    === Admin ===
import admin from '../../Modules/Admin/rdx_rdc/rdc_adLib';
//    === Ecomm ===

//    === Library ===
import library from '../../Modules/Library/rdx_rdc/rdc_library';
import playlist from '../../Modules/Library/rdx_rdc/rdc_playlist';
import search from '../../Modules/Library/rdx_rdc/rdc_search';
import filter from '../../Modules/Library/rdx_rdc/rdc_filter';
//    === User ===
import auth from '../../Modules/User/rdx_rdc/rdc_auth';
import profile from '../../Modules/User/rdx_rdc/rdc_profile';
//    === Notify ===
import alert from '../../Modules/Notify/rdx_rdc/rdc_alert';

export default combineReducers({
  admin,
  library,
  playlist,
  search,
  filter,
  alert,
  auth,
  profile
});
