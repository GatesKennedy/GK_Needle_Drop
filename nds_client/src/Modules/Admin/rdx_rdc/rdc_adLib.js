import {
  AD_PLAYLIST_GET,
  AD_PLAYALL_GET,
  AD_PLAYLIST_UPDATE,
  AD_PLAYLIST_DELETE,
  AD_PLAYLIST_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  playlistsAll: null,
  playlistChosen: null,
  trkChosen: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case AD_PLAYALL_GET:
      return {
        ...state,
        playlistsAll: payload,
        loading: false
      };
    case AD_PLAYLIST_GET:
      return {
        ...state,
        playlistChosen: payload,
        loading: false
      };

    //  UPDATE
    case AD_PLAYLIST_UPDATE:
      return {
        ...state,
        playlistChosen: payload,
        loading: false
      };
    //  DELETE
    case AD_PLAYLIST_DELETE:
      return {
        ...state,
        playlistsAll: payload,
        playlistChosen: null,
        trkChosen: null,
        loading: false
      };
    //  ERROR
    case AD_PLAYLIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    //  DEFAULT
    default:
      return state;
  }
}
