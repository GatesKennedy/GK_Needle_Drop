import React, { Fragment } from 'react';
import spinner from './assets/spin.gif';

export default () => (
  <Fragment>
    <img src={spinner} className='center show spin' alt='uh, one sec..' />
  </Fragment>
);
