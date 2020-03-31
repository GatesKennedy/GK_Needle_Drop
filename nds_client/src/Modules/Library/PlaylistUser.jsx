import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useCollapse from 'react-collapsed';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlaylist, selectPlaylist } from './rdx_axn/axn_playlist';
import { updateLibType } from './rdx_axn/axn_library';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
//  Comps
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';
import PlaylistFavs from './PlaylistFavs';
import PlaylistCreate from './PlaylistCreate';
import PlaylistItem from './PlaylistItem';
import Spinner from '../Notify/Spin';

const MyLists = ({
  auth: { user, isAuthenticated, loading },
  profile: { profile, playlists, favorites }
}) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  const plistStr = JSON.stringify(playlists);

  console.log('PlaylistUser> playlists: ' + plistStr);
  return (
    <Fragment>
      <div className='menu'>
        <section>
          <div
            className='menu-head bg-blu2'
            id='mylist-cont'
            {...getToggleProps({
              onClick: () => {
                setOpen(oldOpen => !oldOpen);
              }
            })}
          >
            <h2 className='menu-title row'>
              {isOpen ? 'My Lists' : 'My Lists'}
            </h2>
            <Add className='menu-title row  menu-btn' />
          </div>
        </section>

        <section {...getCollapseProps()}>
          {isAuthenticated ? (
            <Fragment>
              <section className='menu stack'>
                {playlists.map(plist => (
                  <PlaylistItem className='nah' key={plist.id} list={plist} />
                ))}
              </section>
            </Fragment>
          ) : (
            <Fragment>
              <h5>You'll need to log in...</h5>
              <button className='btn'>
                <Link to='/login'>Login</Link>
              </button>
            </Fragment>
          )}
          <PlaylistCreate />
        </section>
      </div>
    </Fragment>
  );
};

MyLists.propTypes = {
  auth: PropTypes.object.isRequired,
  createPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  libType: state.library.libType,
  pListSelected: state.playlist.pListSelected
});

export default connect(mapStateToProps, {
  createPlaylist,
  selectPlaylist,
  updateLibType
})(MyLists);
