import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Add } from './assets/vex/menu-add.svg';

const Lists = props => {
  return (
    <Fragment>
      <section className='menu stack Lists' id='fitler-cont'>
        <div className='menu-head bg-blu2'>
          <h2 className='group-name'>
            MY LISTS
            <Add className='menu-btn' />
          </h2>
        </div>
        <div className='menu stack'>
          <p>Cool good songs</p>
          <p>project dundee</p>
          <p>sad fun songs</p>
          <p>Favorites</p>
        </div>
      </section>
    </Fragment>
  );
};

Lists.propTypes = {};

export default Lists;
