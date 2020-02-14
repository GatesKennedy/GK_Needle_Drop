//  React
import React, { Component, Fragment } from '../../../node_modules/react';
import { Link } from '../../../node_modules/react-router-dom';
//  REDUX
import PropTypes from 'prop-types';
//  ASSET
import Headshot from './assets/img/PageHead_ArtistTest.png';

function PageHead(props) {
  return (
    <Fragment>
      <div className='bg-pnk2'>
        BIG BAD BOY
        <div id='artist-pic'>
          <img src={Headshot}></img>
        </div>
        <div id='artist-text'>
          <div id='artist-quote'>
            "Cute quote.. Love is patient, Love is Kind..."
          </div>
          <div id='artist-name'>Arist Name</div>
          <div id='artist-bio'>
            Digital Woods is the nom de plume of Tyler Morissette. His work has
            been featured in several theatrical release films and commercial
            productions. He’s known for his quality production and wide
            genre-hopping range, including urban, R’n’B, hip hop, ambient, and
            electronic.
          </div>
        </div>
      </div>
    </Fragment>
  );
}

PageHead.propTypes = {};

export default PageHead;
