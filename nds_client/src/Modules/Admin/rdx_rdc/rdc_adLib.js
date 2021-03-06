import {
  AD_PLAYLIST_GET,
  AD_PLAYLIST_UPDATE,
  AD_PLAYLIST_DELETE,
  AD_PLAYLIST_ERROR
} from '../../../Main/util/axn_types';

const initialState = {
  pListChosen: null,
  trkChosen: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //  GET
    case AD_PLAYLIST_GET:
      return {
        ...state,
        pListChosen: payload,
        loading: false
      };

    //  UPDATE
    case AD_PLAYLIST_UPDATE:
      return {
        ...state,
        pListChosen: payload,
        loading: false
      };
    //  DELETE
    case AD_PLAYLIST_DELETE:
      return {
        ...state,
        pListAll: payload,
        pListChosen: null,
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
