import React, { Fragment, useEffect, useState } from 'react';
import useCollapse from 'react-collapsed';
//  REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlaylist } from './rdx_axn/axn_playlist';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
//  Comps
export const PlaylistCreate = ({
  createPlaylist,
  auth: { user, isAuthenticated, loading },
  profile: { profile, playlists, favorites }
}) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  //  formData (useState)
  const [formData, setFormData] = useState({
    pListName: ''
  });
  //  formData (declare)
  const { pListName } = formData;
  //  formData (change)
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  //  formData (submit)
  const onSubmit = async e => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAlert("oh no... you're not logged in", 'warn');
    } else {
      const creator = user[0].id;
      await createPlaylist({ pListName, creator });
      setAlert('NEW Playlist by ' + profile.user_name, 'warn');
    }
  };

  //  Toggle Create Form
  const [displayCreatePlist, toggleCreatePlist] = useState(false);
  return (
    <div>
      {!isOpen && (
        <button
          className='menu stack '
          id='mylist-cont'
          {...getToggleProps({
            onClick: () => {
              setOpen(oldOpen => !oldOpen);
            }
          })}
        >
          New Playlist
        </button>
      )}
      <section {...getCollapseProps()}>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Playlist Name'
              name='pListName'
              className='form-text'
              onChange={e => onChange(e)}
            />
          </div>
          <div className='row'>
            <div className='form-group row'>
              <input type='submit' value='Create' className='btn submit' />
            </div>
            <div className='row'>
              <button
                className='btn submit'
                {...getToggleProps({
                  onClick: () => {
                    setOpen(oldOpen => !oldOpen);
                  }
                })}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

PlaylistCreate.propTypes = {
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
  createPlaylist
})(PlaylistCreate);
