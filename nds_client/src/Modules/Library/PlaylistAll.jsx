import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { getPlistAdmin, selectPlaylist } from './rdx_axn/axn_playlist';
import { clrLibResult } from './rdx_axn/axn_library';
//  COMPS
import Spinner from '../Notify/Spin';
import libResult from './TrkList';
import PListCard from '../NDS/PListCard';
import TrkList from './TrkList';

const PlaylistAll = ({
  getPlistAdmin,
  selectPlaylist,
  playlist: { pListAdmin, pListSelected, loading }
}) => {
  useEffect(() => {
    getPlistAdmin();
  }, []);

  return (
    <Fragment>
      {pListSelected ? (
        <TrkList trkList={pListSelected} />
      ) : (
        <h4>Select a Playlist</h4>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {' '}
          <div className='grid3'>
            {pListAdmin.map(plist => (
              <div
                className='row'
                key={plist.id}
                onClick={() => selectPlaylist(plist.id)}
              >
                <PListCard title={plist.name} />
              </div>
            ))}
          </div>
        </Fragment>
      )}
      {libResult ? <div className='stack'>oops</div> : <p>oh No</p>}
    </Fragment>
  );
};

PlaylistAll.propTypes = {};

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(mapStateToProps, {
  getPlistAdmin,
  selectPlaylist
})(PlaylistAll);
