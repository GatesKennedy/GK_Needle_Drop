import React from 'react';
import PropTypes from 'prop-types';
//  COMPS
import { ReactComponent as Play } from './assets/vex/carol-play.svg';

import image from './assets/img/Playlist_SlowJams.png';

const PListCard = ({ img, title }) => {
  return (
    <div id='plist-card'>
      <img src={image} alt=''></img>
      <Play />
      <div>Slow Jams</div>
    </div>
  );
};

PListCard.propTypes = {};

// const mapStateToProps = state => ({});

export default PListCard;
