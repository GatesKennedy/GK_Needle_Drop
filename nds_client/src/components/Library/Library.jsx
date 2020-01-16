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
import TrkLib from './TrkLib';

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
      <section className='page lib group' id='lib-page'>
        <header className='head-page span' id='library-head'>
          Browse Music
        </header>

        <Search />
        <Filter />
        <div>Library:</div>
        <div className='cont fill lib browse' id='browse-cont'>
          <TrkLib />
          <TrkLib />
          <TrkLib />
          <TrkLib />
        </div>
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
