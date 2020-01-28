import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Filter = props => {
  return (
    <Fragment>
      <section className='menu stack Filter' id='fitler-cont'>
        <div className='menu-head bg-blu2'>
          <h2 className='group-name'>
            FILTER
            <Add className='menu-btn' />
          </h2>
        </div>
        <div className='menu stack'>
          <p>Genre</p>
          <p>Mood</p>
          <p>Attributes</p>
          <p>Type</p>
          <p>Clear</p>
        </div>
      </section>
    </Fragment>
  );
};

Filter.propTypes = {};

export default Filter;
