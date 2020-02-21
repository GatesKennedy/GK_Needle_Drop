import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//  COMPS
import Trk from '../Library/Trk';

const Playlist = ({ libData }) => {
  return (
    <Fragment>
      <div className='plist-icon gird'>
        <div className='center'>
          <ul>
            {libData.map(trk => (
              <li>{trk.song}</li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

Playlist.propTypes = {};

export default Playlist;
