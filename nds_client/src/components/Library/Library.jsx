//  React
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import PropTypes from 'prop-types';

import Carol from './Carol';
import BrowList from './BrowList';
import Spinner from '../Notify/Spin';

function Library(props) {
  return (
    <Fragment>
      <Carol />>
      <BrowList />>
    </Fragment>
  );
}

Library.propTypes = {};

export default Library;
