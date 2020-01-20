import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import { getBrowList } from './rdx_axn/axn_library';
import PropTypes from 'prop-types';

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
          <TrkLib />
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
  browList: state.libData
});

export default connect(mapStateToProps, { getBrowList })(BrowList);
