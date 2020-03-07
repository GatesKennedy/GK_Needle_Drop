import React, { Component } from 'react';
import Slider from 'react-slick';

import PropTypes from 'prop-types';

import CarolMockasin from '../Modules/Library/assets/img/carol-mocks.png';

export default class Carol extends Component {
  render() {
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
          <div>
            <img src={CarolMockasin} />
          </div>
          <div>
            <img src={CarolMockasin} />
          </div>
          <div>
            <img src={CarolMockasin} />
          </div>
          <div>
            <img src={CarolMockasin} />
          </div>
          <div>
            <img src={CarolMockasin} />
          </div>
          <div>
            <img src={CarolMockasin} />
          </div>
          <div>
            <img src={CarolMockasin} />
          </div>
        </Slider>
      </div>
    );
  }
}

Carol.propTypes = {};

//export default Carol;
