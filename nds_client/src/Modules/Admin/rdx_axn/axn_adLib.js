import axios from 'axios';
import { setAlert } from '../../../Modules/Notify/rdx_axn/axn_alert';

import {
  AD_PLAYALL_GET,
  AD_PLAYALL_ERROR,
  AD_PLAYLIST_GET,
  AD_PLAYLIST_UPDATE,
  AD_PLAYLIST_DELETE,
  AD_PLAYLIST_ERROR
} from '../../../Main/util/axn_types';

//============================
//  GET: Select Playlist Button
export const selectPlaylist = pList => {
  try {
    return {
      type: 'AD_PLAYLIST_GET',
      payload: pList
    };
  } catch (err) {
    return {
      type: 'AD_PLAYLIST_ERROR'
    };
  }
};

//============================
//  GET: Select Playlist Button
export const selectPlaylist = pList => {
  try {
    return {
      type: 'AD_PLAYLIST_GET',
      payload: pList
    };
  } catch (err) {
    return {
      type: 'AD_PLAYLIST_ERROR'
    };
  }
};
