import React, { Fragment, useEffect } from 'react';
//  REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TrkLib from './TrkLib';

function BrowList(props) {
  return (
    <Fragment>
      <section>
        <div className=' horz-row ' id='brow-cont'>
          <TrkLib />
          <TrkLib />
          <TrkLib />
          <TrkLib />
        </div>
      </section>
    </Fragment>
  );
}

BrowList.propTypes = {};

export default BrowList;
