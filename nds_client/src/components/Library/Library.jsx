//  React
import React, { Component, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import { getFiltered } from './rdx_axn/axn_filter';
import { getLibrary } from './rdx_axn/axn_library';
import PropTypes from 'prop-types';

import Carol from './Carol';
import BrowList from './BrowList';
import Spinner from '../Notify/Spin';

const Library = ({ getLibrary }) => {
  useEffect(() => {
    getLibrary();
  }, []);

  return getLibrary === null ? (
    <Fragment>
      <section className='open center'>
        <Spinner />
      </section>
    </Fragment>
  ) : (
    <Fragment>
      <section className='page lib group bg-crm3' id='lib-page'>
        <div>Library:</div>
        <Carol />
        <BrowList />
      </section>
    </Fragment>
  );
};

Library.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.libraryOut
});

export default connect(mapStateToProps, { getLibrary })(Library);
