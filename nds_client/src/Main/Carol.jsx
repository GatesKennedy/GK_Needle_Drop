import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { selectPlaylist } from '../Modules/Library/rdx_axn/axn_playlist';
import CarolMockasin from '../Modules/Library/assets/img/carol-mocks.png';

const Carol = ({ selectPlaylist, carolList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div>
      {carolList ? (
        <Slider {...settings}>
          {carolList.map(list => (
            <Link
              to='/playlists'
              className='carol-img'
              key={list.id}
              onClick={() => selectPlaylist(list.id)}
            >
              <img src={CarolMockasin} />
              <h1>{list.name}</h1>
            </Link>
          ))}
        </Slider>
      ) : (
        <div>
          <h1>No Playlists</h1>
        </div>
      )}
    </div>
  );
};

Carol.propTypes = {
  carolList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(mapStateToProps, { selectPlaylist })(Carol);
