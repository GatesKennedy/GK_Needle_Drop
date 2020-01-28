//  React
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import PropTypes from 'prop-types';

import Carol from './Carol';
import BrowList from './BrowList';
import BrowMenu from './BrowMenu';
import Spinner from '../Notify/Spin';

function Library(props) {
  return (
    <Fragment>
      <div className='bg-crm2'>
        <Carol />
        <div className='cont menu' id='brow-cont'>
          <BrowMenu />
          <BrowList />
        </div>
      </div>
    </Fragment>
  );
}

Library.propTypes = {};

export default Library;
