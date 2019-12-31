import axios from 'axios';
import { setAlert } from './axn_alert';

import { GROUP_GET, GROUP_ERROR } from './axn_types';

//  Get ToolList
export const getToolList = () => async dispatch => {
  try {
    const res = await axios.get('/api/dash/tool_list');

    dispatch({
      type: GROUP_GET,
      payload: res.data
    });
  } catch (err) {
    console.log('axn_group.js: catch error');

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Get GroupList by ID
export const getGroupListById = groupId => async dispatch => {
  try {
    const res = await axios.get(`/api/dash/group${groupId}`);

    dispatch({
      type: GROUP_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Create or Update Group
export const createGroup = (
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

    const res = await axios.post('/api/dash', formData, config);

    dispatch({
      type: GROUP_GET,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

    if (!edit) {
      history.push('/dash');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warn')));
    }

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
