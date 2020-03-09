import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
//  COMPS
import PlayAll from './PlayAll';
import Trk from '../Library/Trk';

const Playlist = ({ library: { libData, loading } }) => {
  return (
    <Fragment>
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

export default connect(mapStatToProps)(Playlist);
