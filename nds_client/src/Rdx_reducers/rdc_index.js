import { combineReducers } from 'redux';
import alert from './rdc_alert';
import auth from './rdc_auth';
import profile from './rdc_profile';

export default combineReducers({
  alert,
  auth,
  profile
});
