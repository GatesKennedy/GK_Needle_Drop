//  React
import React, { Component, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import { getLibrary, getArtists } from './rdx_axn/axn_library';
import PropTypes from 'prop-types';

import Carol from './Carol';
import BrowList from './BrowList';
import Spinner from '../Notify/Spin';

const Library = ({ getLibrary, library: { libData, loading } }) => {
  useEffect(() => {
    getLibrary();
  }, []);

  console.log('ello moto:' + libData);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Carol />>
          <BrowList />>
        </Fragment>
      )}
    </Fragment>
  );
};

Library.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibrary })(Library);
