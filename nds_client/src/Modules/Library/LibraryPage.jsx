import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'prop-types';
import PropTypes from 'prop-types';
import { getLibResult } from './rdx_axn/axn_library';
//  Comps
import Header from '../NDS/Header';
import Carol from '../../Main/Carol';
import TrkList from './TrkList';
import Search from './Search';
import Filter from './Filter';
import ListsUser from './PlaylistUser';
//  Assets

const LibraryPage = ({ library }) => {
  return (
    <Fragment>
      <div className='bg-crm2'>
        <Header title='Browse Music' />
        <Carol />
        <div className='cont menu' id='brow-cont'>
          <div className='cont menu bg-crm3' id='browser-menu'>
            <Search />
            <Filter />
            <ListsUser />
          </div>
          <TrkList trks={library.libResult} />
        </div>
      </div>
    </Fragment>
  );
};

LibraryPage.propTypes = {
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps)(LibraryPage);
