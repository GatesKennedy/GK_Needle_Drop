import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibrary } from './rdx_axn/axn_library';
//  Comps
import Trk from './Trk';
import Spinner from '../Notify/Spin';

const BrowList = ({ getLibrary, library: { libData, loading } }) => {
  useEffect(() => {
    getLibrary();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='stack' id='brow-list'>
            {libData ? (
              <ul className='stack'>
                {libData.map(trk => (
                  <li key={trk.id}>
                    <Trk trk={trk} />
                  </li>
                ))}
              </ul>
            ) : (
              <h4>No Tracks found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

BrowList.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibrary })(BrowList);