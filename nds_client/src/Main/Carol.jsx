import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { selectPlaylist } from '../Modules/Library/rdx_axn/axn_playlist';
import CarolMockasin from '../Modules/Library/assets/img/carol-mocks.png';

const Carol = ({ selectPlaylist, playlist: { pListAdmin } }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div>
      <Slider {...settings}>
        {pListAdmin ? (
          pListAdmin.map(plist => (
            <Link
              to='/playlists'
              className='carol-img'
              key={plist.id}
              onClick={() => selectPlaylist(plist.id)}
            >
              <img src={CarolMockasin} />
              <h1>{plist.name}</h1>
            </Link>
          ))
        ) : (
          <div>
            <img src={CarolMockasin} />
            <h1>demolishit</h1>
          </div>
        )}
      </Slider>
    </div>
  );
};

Carol.propTypes = {
  list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(mapStateToProps, { selectPlaylist })(Carol);
