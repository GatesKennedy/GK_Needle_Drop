//  React
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import PropTypes from 'prop-types';

import Header from '../../Main/Header';
import Carol from '../../Main/Carol';
import BrowList from './BrowList';
import Search from './Search';
import Filter from './Filter';
import Lists from '../../Main/Lists';
import Spinner from '../Notify/Spin';

function Library(props) {
  return (
    <Fragment>
      <div className='bg-crm2'>
        <Header />
        <Carol />
        <div className='cont menu' id='brow-cont'>
          <div className='cont menu bg-crm3' id='browser-menu'>
            <Search />
            <Filter />
            <Lists />
          </div>
          <BrowList />
        </div>
      </div>
    </Fragment>
  );
}

Library.propTypes = {};

export default Library;
