import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import {
  getPListNames,
  getPlayAll,
  getPlaylist
} from '../Library/rdx_axn/axn_playlist';
//  COMPS
import Spinner from '../Notify/Spin';
import Playlist from './Playlist';

const PlayAll = ({
  getPListNames,
  getPlayAll,
  getPlaylist,
  library: { libData },
  playlist: { pListNames, loading }
}) => {
  useEffect(() => {
    getPListNames();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {' '}
          <div className='grid3'>
            {pListNames.map(plist => (
              <button
                key={plist.id}
                className='grid'
                onClick={() => getPlaylist(plist.id)}
              >
                {plist.name}
              </button>
            ))}
          </div>
        </Fragment>
      )}
      {libData ? (
        <div className='stack'>
          <Playlist libData={libData} />
        </div>
      ) : (
        <p>oh No</p>
      )}
    </Fragment>
  );
};

PlayAll.propTypes = {};

const mapStateToProps = state => ({
  library: state.library,
  playlist: state.playlist
});

export default connect(mapStateToProps, {
  getPListNames,
  getPlayAll,
  getPlaylist
})(PlayAll);
