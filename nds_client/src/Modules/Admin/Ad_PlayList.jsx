import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { getPlistAdmin, selectPlaylist } from '../Library/rdx_axn/axn_playlist';
//  COMPS
import Navi from './Ad_Navi';
import Browse from './Ad_Browse';
import Spinner from '../Notify/Spin';
import Ad_Navi from './Ad_Navi';
import { selectPlist } from '../Library/rdx_axn/axn_library';

const Ad_Playlist = ({
  getPlistAdmin,
  selectPlaylist,
  admin,
  library,
  playlist: { pListAdmin, pListSelected, loading }
}) => {
  useEffect(() => {
    getPlistAdmin();
  }, []);

  return (
    <Fragment>
      <Ad_Navi />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            {/* ALLLIST */}
            <section id='ad-menu'>
              <div className='col bg-gry2 menu'>
                <p className=''>Choose Me</p>
                <div className=''>
                  {pListAdmin.map(plist => (
                    <button
                      key={plist.id}
                      className='col'
                      onClick={() => selectPlaylist(plist.id)}
                    >
                      {plist.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            {/* PLAYLIST */}
            <section id='ad-playlist'>
              <p>Change Me</p>
              <p>=========</p>
              <div className='stack' id='brow-list'>
                {pListSelected ? (
                  <ul className='stack'>
                    {pListSelected.map(trk => (
                      <li key={trk.song_id}>
                        <div className='row'>{trk.artist}</div>
                        <div className='row'> "{trk.song}"</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h4>No Playlist Selected</h4>
                )}
              </div>
            </section>

            <section id='ad-browse'>
              <div className='col'>
                <Browse />
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Ad_Playlist.propTypes = {};

const mapStateToProps = state => ({
  admin: state.admin,
  library: state.library,
  playlist: state.playlist
});

export default connect(mapStateToProps, {
  getPlistAdmin
})(Ad_Playlist);
