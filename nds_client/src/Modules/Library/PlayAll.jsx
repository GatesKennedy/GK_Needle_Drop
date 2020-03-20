import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import {
  getPListNames,
  getPlayAll,
  getPlaylist
} from '../Library/rdx_axn/axn_playlist';
import { clrLibData } from '../Library/rdx_axn/axn_library';
//  COMPS
import Spinner from '../Notify/Spin';
import Playlist from './Playlist';
import PListCard from '../NDS/PListCard';

const PlayAll = ({
  getPListNames,
  getPlaylist,
  library: { libData },
  playlist: { pListNames, loading }
}) => {
  useEffect(() => {
    getPListNames();
  }, []);

  return (
    <Fragment>
      <Playlist />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {' '}
          <div className='grid3'>
            {pListNames.map(plist => (
              <div
                className='row'
                key={plist.id}
                onClick={() => getPlaylist(plist.id)}
              >
                <PListCard title={plist.name} />
              </div>
            ))}
          </div>
        </Fragment>
      )}
      {libData ? <div className='stack'>oops</div> : <p>oh No</p>}
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
