import React, { Fragment } from 'react';
import spinner from './art/spin.gif';

export default () => (
  <Fragment>
    <img src={spinner} class='center show spin' alt='uh, one sec..' />
  </Fragment>
);
