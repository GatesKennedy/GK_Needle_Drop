import React, { useEffect, useState } from '../../../node_modules/react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFavorite, getCurrentProfile } from '../User/rdx_axn/axn_profile';
import { SetAlert, setAlert } from '../Notify/rdx_axn/axn_alert';
//  ASSETS
import { ReactComponent as Play } from './assets/vex/trk-play.svg';
import { ReactComponent as Add } from './assets/vex/trk-add.svg';
import { ReactComponent as Wav } from './assets/vex/trk-wav.svg';
import { ReactComponent as Down } from './assets/vex/trk-down.svg';
import { ReactComponent as Fav } from './assets/vex/trk-fav.svg';
import { ReactComponent as Cart } from './assets/vex/trk-cart.svg';

import img from './assets/img/trk-img.png';

const Trk = ({
  trk,
  favs,
  updateFavorite,
  auth: { loading, user, isAuthenticated }
}) => {
  const onFav = async e => {
    e.preventDefault();
    if (isAuthenticated) {
      console.log('USER Id: ' + user[0].id);
      const favors = JSON.stringify(favs);
      console.log('FAVORS: ' + favors);
      updateFavorite(user[0].id, trk.id, false);
    } else {
      setAlert('Login to favorite a song', 'warn');
    }
  };

  const guestAdd = <Add />;

  return (
    <div className='' id='trk-cont'>
      <div className='lib trk btn' id='lib-btn-play'>
        <Play />
      </div>
      <div className='lib trk btn' id='lib-btn-add'>
        <div>
          <Add />
        </div>
      </div>
      <div className='lib trk img' id='lib-trk-img'>
        <img src={img}></img>
      </div>
      <div className='lib trk stack btn' id='lib-btn-info'>
        <div className='lib txt stack txt-trk' id='trk-txt-song'>
          {trk.song}
        </div>
        <div className='lib txt stack txt-trk' id='trk-txt-artist'>
          {trk.artist}
        </div>
      </div>
      <div className='lib trk wav' id='lib-btn-wav'>
        <Wav />
      </div>
      <div className='lib trk txt' id='lib-btn-time'>
        {trk.time}
      </div>
      <div className='lib trk btn' id='lib-btn-down'>
        <Down />
      </div>
      <div className='lib trk btn' id='lib-btn-fav'>
        <div onClick={e => onFav(e)}>
          <Fav />
        </div>
      </div>
      <div className='lib trk btn' id='lib-btn-cart'>
        <Cart />
      </div>
    </div>
  );
};

Trk.propTypes = {
  trk: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  favs: PropTypes.array.isRequired
  // avatar: PropTypes.object.isRequired,
  // title: PropTypes.object.isRequired,
  // artist: PropTypes.object.isRequired,
  // file: PropTypes.object.isRequired,
  // time: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  favs: state.profile.favorites,
  auth: state.auth
});

export default connect(mapStateToProps, { updateFavorite })(Trk);
