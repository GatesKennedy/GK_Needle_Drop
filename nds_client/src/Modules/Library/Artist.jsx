//  React
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import PropTypes from 'prop-types';

import PageHead from '../NDS/PageHead';
import BrowList from './BrowList';
import Search from './Search';
import Filter from './Filter';
import Lists from '../../Main/Lists';
import Spinner from '../Notify/Spin';

function Artist(props) {
  return (
    <Fragment>
      <div className='bg-crm2'>
        <PageHead />
        <div className='cont menu' id='brow-cont'>
          <div className='cont menu bg-crm3' id='browser-menu'>
            <Lists />
          </div>
          <BrowList />
        </div>
      </div>
    </Fragment>
  );
}

Artist.propTypes = {};

export default Artist;
