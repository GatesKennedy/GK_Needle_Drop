import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCollapse from 'react-collapsed';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlaylist } from './rdx_axn/axn_playlist';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
//  Comps
import { ReactComponent as Add } from '../NDS/assets/vex/Add.svg';
import Spinner from '../Notify/Spin';

const Lists = ({
  createPlaylist,
  auth: { user, isAuthenticated, loading },
  lists
}) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });
  const name = 'TestList';

  //  formData (submit)
  const onSubmit = async e => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAlert("oh no... passwords don't match", 'warn');
      console.log('oh no... badwords');
    } else {
      const creator = user[0].id;
      setAlert('WELCOME!', 'warn');
      createPlaylist({ name, creator });
      console.log('oh no... youre good...');
    }
  };

  return (
    <Fragment>
      <section
        className='menu stack Lists'
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

      <section {...getCollapseProps()}>
        {loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <section>
            <form onSubmit={e => onSubmit(e)}>
              <input
                type='submit'
                value='Create Playlist'
                className='btn submit'
              />
            </form>
            {}
            <div className='menu-title'>My Lists</div>
          </section>
        ) : (
          <div className='menu-title stack center'>
            <h5 className='stack'>login to view your playlists</h5>
            <Link to='/login' className='stack center'>
              <div className=' btn'>Login</div>
            </Link>
          </div>
        )}
      </section>
    </Fragment>
  );
};

Lists.propTypes = {
  lists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createPlaylist })(Lists);
