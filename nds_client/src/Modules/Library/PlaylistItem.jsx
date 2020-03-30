import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useCollapse from 'react-collapsed';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPlaylist, deletePlaylist } from './rdx_axn/axn_playlist';
import { updateLibType } from './rdx_axn/axn_library';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
//  Comps
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';
import PlaylistCreate from './PlaylistCreate';
import Spinner from '../Notify/Spin';

const PlaylistItem = ({
  list,
  selectPlaylist,
  deletePlaylist,
  auth: { user, isAuthenticated, loading }
}) => {
  const listString = JSON.stringify(list);
  console.log('PlaylistItem > listString: ' + listString);
  console.log('list.id: ' + list.id);
  return (
    <Fragment>
      <div
        key={list.id}
        className='btn row'
        onClick={() => selectPlaylist(list.id)}
      >
        <h5 className='row'>{list.name}</h5>
        {'    '}
      </div>
      <div
        className='row delete'
        onClick={() => {
          //alertConfirm();
          deletePlaylist(list.id);
        }}
      >
        X
      </div>
    </Fragment>
  );
};

PlaylistItem.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  libType: state.library.libType,
  pListSelected: state.playlist.pListSelected
});

export default connect(mapStateToProps, {
  deletePlaylist,
  selectPlaylist
})(PlaylistItem);
