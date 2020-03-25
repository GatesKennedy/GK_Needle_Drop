import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibrary } from '../Library/rdx_axn/axn_library';
//  Comps
//import Trk from './Trk';
import Spinner from '../Notify/Spin';

const Ad_Browse = ({ getLibrary, library: { loading } }) => {
  useEffect(() => {
    getLibrary();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='stack bg-gry2' id='brow-list'>
            Find Me
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Ad_Browse.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibrary })(Ad_Browse);
