import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBrowList, getArtists } from './rdx_axn/axn_library';
//  Comps
import TrkLib from './TrkLib';
import Spinner from '../Notify/Spin';

const BrowList = ({ getBrowList, browList: { libData, loading } }) => {
  useEffect(() => {
    getBrowList();
  }, []);

  console.log('ello moto:' + libData);

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
  browList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  browList: state.browList
});

export default connect(mapStateToProps, { getBrowList })(BrowList);
