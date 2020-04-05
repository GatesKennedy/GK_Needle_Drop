import React, { useEffect, useState } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFavorite, getCurrentProfile } from '../User/rdx_axn/axn_profile';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
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
  setAlert,
  auth: { loading, user, isAuthenticated }
}) => {
  const favors = JSON.stringify(favs);

  const onFav = async e => {
    e.preventDefault();
    let exists = false;
    if (isAuthenticated) {
      //  Check Exists
      if (favs.includes(trk.id)) exists = true;

      //  updateFav()
      updateFavorite(user[0].id, trk.id, exists);
    } else {
      console.log('Trk > onFav > Not Auth User');
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
};
const mapStateToProps = state => ({
  favs: state.profile.favorites,
  auth: state.auth
});

export default connect(mapStateToProps, { updateFavorite, setAlert })(Trk);
