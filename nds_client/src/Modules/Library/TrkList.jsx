import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibData } from './rdx_axn/axn_library';
//  Comps
import Trk from './Trk';
import Spinner from '../Notify/Spin';

const TrkList = ({ getLibData, library: { libData, loading } }) => {
  useEffect(() => {
    getLibData();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div id='trk-list'>
            {libData ? (
              <ul className='stack'>
                {libData.map(trk => (
                  <li className='trk-list-item' key={trk.id}>
                    <Trk trk={trk} />
                  </li>
                ))}
              </ul>
            ) : (
              <h4>No Track found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

TrkList.propTypes = {
  getLibData: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibData })(TrkList);
