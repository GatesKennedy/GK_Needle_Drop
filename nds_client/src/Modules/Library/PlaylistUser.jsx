import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCollapse from 'react-collapsed';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlaylist, selectPlaylist } from './rdx_axn/axn_playlist';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
//  Comps
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';
import Spinner from '../Notify/Spin';

const MyLists = ({
  createPlaylist,
  selectPlaylist,
  auth: { user, isAuthenticated, loading },
  profile: { profile, playlists, favorites }
}) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });
  const name = 'TestList';

  //  formData (submit)
  const onSubmit = async e => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAlert("oh no... you're not logged in", 'warn');
    } else {
      const creator = user[0].id;
      setAlert('NEW Playlist by ' + profile.user_name, 'warn');
      createPlaylist({ name, creator });
    }
  };

  return (
    <Fragment>
      <section
        className='menu stack '
        id='mylist-cont'
        {...getToggleProps({
          onClick: () => setOpen(oldOpen => !oldOpen)
        })}
      >
        <div className='menu-head bg-blu2'>
          <h2 className='menu-title row'>MY LISTS</h2>
          <Add className='menu-title row  menu-btn' />
        </div>
      </section>

      <section {...getCollapseProps()} className='stack'>
        {loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Fragment>
            <section className='cont btn btn-create' id='mylist-cont'>
              <form onSubmit={e => onSubmit(e)}>
                <input
                  type='submit'
                  value='Create Playlist'
                  className='btn submit'
                />
              </form>{' '}
            </section>
            <section>
              <div className='menu-title'>
                <ul className='stack'>
                  {playlists.map(plist => (
                    <li key={plist.id}>
                      <div
                        className='btn'
                        onClick={() => selectPlaylist(plist.id)}
                      >
                        {plist.name}
                      </div>{' '}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Fragment>
        ) : (
          <div className=''>
            <h5 className='stack center'>...to view your playlists</h5>

            <div className='stack center'>
              <Link to='/login' className='btn'>
                Login
              </Link>
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

MyLists.propTypes = {
  auth: PropTypes.object.isRequired,
  createPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { createPlaylist, selectPlaylist })(
  MyLists
);
