import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBrowList, getArtists } from './rdx_axn/axn_library';
//  Comps
import TrkLib from './TrkLib';
import Spinner from '../Notify/Spin';

const BrowList = ({ getBrowList, library: { libData, loading } }) => {
  useEffect(() => {
    getBrowList();
  }, []);

  console.log('ello moto:');

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Track Party</h1>
        </Fragment>
      )}
    </Fragment>
  );
};

BrowList.propTypes = {
  getBrowList: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getBrowList })(BrowList);
