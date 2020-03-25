import React, { Fragment } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLibResult } from './rdx_axn/axn_library';
//  Comps
import Trk from './Trk';
import Spinner from '../Notify/Spin';

const TrkList = ({ library: { libResult, loading } }) => {
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div id='trk-list'>
            {libResult ? (
              <ul className='stack'>
                {libResult.map(trk => (
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
  getLibResult: PropTypes.func.isRequired,
  library: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  library: state.library
});

export default connect(mapStateToProps, { getLibResult })(TrkList);
