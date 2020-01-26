import React, { Fragment, useEffect, useState } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibrary, getArtists } from './rdx_axn/axn_library';
//  Comps
import Trk from './Trk';
import Spinner from '../Notify/Spin';

const TrkList = ({ getLibrary, library: { libData, loading } }) => {
  useEffect(() => {
    getLibrary();
  }, []);

  const Trks = libData.map(trk => {
    return (
      <li>
        <Trk key={trk.id} song={trk.song} artist={trk.artist} time={trk.time} />
      </li>
    );
  });

  return (
    <Fragment>
      <div className='stack-list' id='trk-list'>
        {Trks}
      </div>
    </Fragment>
  );
};

TrkList.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibrary })(TrkList);
