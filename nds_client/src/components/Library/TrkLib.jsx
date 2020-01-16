import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import play from './assets/vex/trk-play.svg';
import add from './assets/vex/trk-add.svg';
import wav from './assets/vex/trk-wav.svg';
import down from './assets/vex/trk-down.svg';
import fav from './assets/vex/trk-fav.svg';
import cart from './assets/vex/trk-cart.svg';

import img from './assets/img/trk-img.png';

const TrkLib = props => {
  return (
    <Fragment>
      <section class='cont horz-row' id='trk-cont'>
        <div className='lib trk btn' id='lib-btn-play'>
          <img src={play} />
        </div>
        <div className='lib trk btn' id='lib-btn-add'>
          <img src={add} />
        </div>
        <div className='lib trk img' id='lib-trk-img'>
          <img src={img} />
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
          <img src={wav} />
        </div>
        <div className='lib trk txt wav' id='lib-btn-time'>
          time
        </div>
        <div className='lib trk btn' id='lib-btn-down'>
          <img src={down} />
        </div>
        <div className='lib trk btn' id='lib-btn-fav'>
          <img src={fav} />
        </div>
        <div className='lib trk btn' id='lib-btn-cart'>
          <img src={cart} />
        </div>
      </section>
    </Fragment>
  );
};

TrkLib.propTypes = {};

export default TrkLib;
