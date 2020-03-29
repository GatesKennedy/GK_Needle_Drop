import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibResult } from './rdx_axn/axn_library';
import { getPlistAdmin } from './rdx_axn/axn_playlist';
//  Comps
import Spinner from '../Notify/Spin';
import Header from '../NDS/Header';
import Carol from '../../Main/Carol';
import TrkList from './TrkList';
import Search from './Search';
import Filter from './Filter';
import PlaylistUser from './PlaylistUser';

//  Assets

const Library = ({
  getPlistAdmin,
  library: { libResult, loading },
  pListAdmin,
  getLibResult
}) => {
  useEffect(() => {
    getPlistAdmin();
    getLibResult();
  }, []);

  const header = ['Browse Music'];

  return (
    <Fragment>
      <div className='bg-crm2'>
        <Header title={header} />
        <Carol carolList={pListAdmin} />
        <div className='cont menu' id='brow-cont'>
          <div className='cont menu bg-crm3' id='browser-menu'>
            <Search />
            <Filter />
            <PlaylistUser />
          </div>
          {loading ? <Spinner /> : <TrkList trkList={libResult} />}
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
