//  React
import React, { Component, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
//  REDUX
import { connect } from 'react-redux';
import { getFiltered } from './rdx_axn/axn_filter';
import { getLibrary } from './rdx_axn/axn_library';
import PropTypes from 'prop-types';

import Search from './Search';
import Filter from './Filter';
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
      <section className='open drop group'>
        <Search />
        <Filter />
        <div>Library:</div>
        <div>{library}</div>
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
