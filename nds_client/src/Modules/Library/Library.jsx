import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibResult } from './rdx_axn/axn_library';
//  Comps
import Header from '../NDS/Header';
import Carol from '../../Main/Carol';
import TrkList from './TrkList';
import Search from './Search';
import Filter from './Filter';
import ListsUser from './PlaylistUser';
import { getPlistAdmin } from './rdx_axn/axn_playlist';
//  Assets

const Library = ({ getPlistAdmin, library, pListAdmin, getLibResult }) => {
  useEffect(() => {
    getPlistAdmin();
    getLibResult();
  }, []);

  return (
    <Fragment>
      <div className='bg-crm2'>
        <Header title='Browse Music' />
        <Carol carolList={pListAdmin} />
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

Library.propTypes = {
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library,
  pListAdmin: state.playlist.pListAdmin
});

export default connect(mapStateToProps, { getPlistAdmin, getLibResult })(
  Library
);
