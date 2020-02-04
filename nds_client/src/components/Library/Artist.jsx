//  React
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import PropTypes from 'prop-types';

import PageHead from '../Main/PageHead';
import BrowList from './BrowList';
import BrowMenu from './BrowMenu';
import Spinner from '../Notify/Spin';

function Artist(props) {
  return (
    <Fragment>
      <div className='bg-crm2'>
        <PageHead />
        <div className='cont menu' id='brow-cont'>
          <BrowMenu />
          <BrowList />
        </div>
      </div>
    </Fragment>
  );
}

Artist.propTypes = {};

export default Artist;
