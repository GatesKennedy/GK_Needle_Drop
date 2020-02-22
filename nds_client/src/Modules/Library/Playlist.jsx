import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
//  COMPS
import PlayAll from './PlayAll';
import Trk from '../Library/Trk';

const Playlist = ({ library: { libData } }) => {
  return (
    <Fragment>
      {libData ? (
        <div className='stack'>
          <div className='stack'>
            <ul className='stack'>
              {libData.map(trk => (
                <li>{trk.song}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h3>Select a Playlist</h3>
      )}
    </Fragment>
  );
};

Playlist.propTypes = {};

const mapStatToProps = state => ({
  library: state.library
});

export default connect(mapStatToProps)(Playlist);
