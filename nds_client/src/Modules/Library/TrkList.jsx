import React, { Fragment } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//  Comps
import Trk from './Trk';
import Spinner from '../Notify/Spin';

const TrkList = ({ trkList }) => {
  return (
    <Fragment>
      <div id='trk-list'>
        {trkList ? (
          <ul className='stack'>
            {trkList.map(trk => (
              <li className='trk-list-item' key={trk.id}>
                <Trk trk={trk} />
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <Spinner />
            <h4>No Tracks found...</h4>
          </div>
        )}
      </div>
    </Fragment>
  );
};

TrkList.propTypes = {};

export default TrkList;
