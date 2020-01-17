import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Play } from './assets/vex/trk-play.svg';
import { ReactComponent as Add } from './assets/vex/trk-add.svg';
import { ReactComponent as Wav } from './assets/vex/trk-wav.svg';
import { ReactComponent as Down } from './assets/vex/trk-down.svg';
import { ReactComponent as Fav } from './assets/vex/trk-fav.svg';
import { ReactComponent as Cart } from './assets/vex/trk-cart.svg';

import img from './assets/img/trk-img.png';

const TrkLib = props => {
  return (
    <Fragment>
      <div className='horz-row' id='trk-cont'>
        <div className='lib trk btn' id='lib-btn-play'>
          <Play />
        </div>
        <div className='lib trk btn' id='lib-btn-add'>
          <Add />
        </div>
        <div className='lib trk img' id='lib-trk-img'>
          <img src={img}></img>
        </div>
        <div className='lib trk stack btn' id='lib-btn-info'>
          <div className='lib txt stack txt-trk' id='trk-txt-song'>
            song title
          </div>
          <div className='lib txt stack txt-trk' id='trk-txt-artist'>
            artist title
          </div>
        </div>
        <div className='lib trk wav' id='lib-btn-wav'>
          <Wav />
        </div>
        <div className='lib trk txt' id='lib-btn-time'>
          time
        </div>
        <div className='lib trk btn' id='lib-btn-down'>
          <Down />
        </div>
        <div className='lib trk btn' id='lib-btn-fav'>
          <Fav />
        </div>
        <div className='lib trk btn' id='lib-btn-cart'>
          <Cart />
        </div>
      </div>
    </Fragment>
  );
};

TrkLib.propTypes = {};

export default TrkLib;