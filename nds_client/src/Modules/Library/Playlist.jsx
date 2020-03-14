import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { clrLibData } from './rdx_axn/axn_library';
//  COMPS
import PlayAll from './PlayAll';
import Trk from '../Library/Trk';
import Header from '../NDS/Header';

const Playlist = ({
  library: { libData, loading },
  playlist: { pListData },
  clrLibData
}) => {
  useEffect(() => {
    clrLibData();
  }, []);

  return (
    <Fragment>
      <Header title='Playlists' />
      {libData ? (
        <div className='stack'>
          <ul className='stack'>
            {libData.map(trk => (
              <li key={trk.song_id}>
                <Trk trk={trk} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3>Select a Playlist</h3>
      )}
    </Fragment>
  );
};

Playlist.propTypes = {};

const mapStatToProps = state => ({
  library: state.library,
  playlist: state.playlist
});

export default connect(mapStatToProps, { clrLibData })(Playlist);
